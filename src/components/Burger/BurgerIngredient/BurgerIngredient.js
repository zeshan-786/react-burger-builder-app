import React, { Component } from 'react'
import './BurgerIngredient.css'
import PropTypes from 'prop-types'

// Class based

class BurgerIngredient extends Component {

    render() {
        let ingredient = null
    switch (this.props.type) {
        case 'bread-bottom':
            ingredient = <div className="BreadBottom" ></div>
            break;
        case 'bread-top':
            ingredient = <div className="BreadTop" >
                <div className="Seeds1" ></div>
                <div className="Seeds2" ></div>
            </div>
            break;
        case 'meat':
            ingredient = <div className="Meat" ></div>
            break;
        case 'cheese':
            ingredient = <div className="Cheese" ></div>
            break;
        case 'bacon':
            ingredient = <div className="Bacon" ></div>
            break;
        case 'salad':
            ingredient = <div className="Salad" ></div>
            break;
        default:
            ingredient = null
            break;
    }
    return ingredient
    }

}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

// Function Based 

// const BurgerIngredient = ( props ) => {
//     let ingredient = null
//     switch (props.type) {
//         case 'bread-bottom':
//             ingredient = <div className="BreadBottom" ></div>
//             break;
//         case 'bread-top':
//             ingredient = <div className="BreadTop" >
//                 <div className="Seed1" ></div>
//                 <div className="Seed2" ></div>
//             </div>
//             break;
//         case 'meat':
//             ingredient = <div className="Meat" ></div>
//             break;
//         case 'cheese':
//             ingredient = <div className="Cheese" ></div>
//             break;
//         case 'bacon':
//             ingredient = <div className="Bacon" ></div>
//             break;
//         case 'salad':
//             ingredient = <div className="Salad" ></div>
//             break;
//         default:
//             ingredient = null
//             break;
//     }
//     return ingredient

// }

export default BurgerIngredient