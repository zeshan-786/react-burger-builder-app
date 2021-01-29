import React, {Component} from 'react'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../../hoc/Aux'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios_orders'
import Spinner from '../../components/UI/Spinner/Spinner'

import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index'

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    handleUpdatePurchaseable = ( ingredients ) => {
        const sum = Object.keys(ingredients)
                        .map(igKey => {
                            return ingredients[igKey]
                        })
                        .reduce( ( sum, el) => {
                            return sum + el
                        }, 0)
        return sum > 0
    }

    handlerPuchase = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })   
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    handlerPurchaseCancel = () => {
        this.setState({ purchasing: false })
    }

    handlerPurchaseContinue = () => {
        this.props.onInitPurchase()
        this.props.history.push({ pathname: '/checkout' })
    }

    componentDidMount() {
        // console.log(this.props);
        this.props.onInitIngredients()
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        }
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // { salad: true, meat: false  }
        let orderSummary = null

        let burger =  this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>
        if ( this.props.ings ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControls
                        price={this.props.totalPrice}
                        ingredientAdded={ this.props.onIngredientAdded }
                        ingredientRemoved={ this.props.onIngredientRemoved }
                        disabled={disabledInfo}
                        purchaseable={ this.handleUpdatePurchaseable( this.props.ings )}
                        ordered={this.handlerPuchase}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            )   

            orderSummary = <OrderSummary 
                                ingredients={this.props.ings}
                                purchaseCanceled={this.handlerPurchaseCancel}
                                purchaseContinued={this.handlerPurchaseContinue}
                                price={this.props.totalPrice}/>
        }

        return (
            <Aux>
                <Modal show={ this.state.purchasing } modalClosed={this.handlerPurchaseCancel}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ( ingName ) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: ( ingName ) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch( burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios))