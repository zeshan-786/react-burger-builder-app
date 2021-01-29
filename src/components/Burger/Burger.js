import React from 'react'

import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = ( props ) => {
    const { ingredients } = props
    let transformedIngredients = Object.keys(ingredients).map( igKey => {
                                        return [ ...Array(ingredients[igKey])].map( (_, i) => {
                                            return  <BurgerIngredient key={ igKey+i } type={igKey} />
                                        })
                                    })
                                    .reduce( ( arr, el ) => {
                                        return arr.concat(el)
                                    }, [])
                                    // console.log(transformedIngredients)
        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start building Burger</p>
            
        }
    return (
        <div className="Burger"> 
            <BurgerIngredient type="bread-top"/>
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default Burger