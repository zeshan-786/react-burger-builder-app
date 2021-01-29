import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../utility'

const initialState = {
    
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return updateObject( state, {
                ingredients: updateObject(state.ingredients,{
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }),
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
             })
        case actionTypes.REMOVE_INGREDIENT:
            return updateObject( state, {
                ingredients: updateObject(state.ingredients,{
                    [action.ingredientName]: state.ingredients[action.ingredientName] ? state.ingredients[action.ingredientName] - 1 : state.ingredients[action.ingredientName]
                }),
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
             })
        case actionTypes.SET_INGREDIENTS:
            return updateObject( state, {
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building: false
            })
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject( state, {
                error: true
            })
        default:
            return state
    }
}

export default reducer
