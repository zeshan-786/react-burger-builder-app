import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

import './CheckoutSummary.css'

const CheckoutSummary = ( props ) => {
    return (
        <div className="CheckoutSummary">
            <h1>Hope it tastes well!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients}/>
            </div>
           <Button btnType="Danger" clicked={props.checkoutCaneled}>Cancel</Button>
           <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>
        </div>
    )
}

export default CheckoutSummary