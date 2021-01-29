import React from 'react'
import './Order.css'

const Order = (props) => {
    const ingredientSummary = Object.keys(props.order.ingredients)
                                .map( igKey => {
                                return <span key={igKey} 
                                            style={{
                                                    textTransform: 'capitalize',
                                                    margin: '0 8px',
                                                    border: '1px solid #ccc',
                                                    padding: '8px',
                                                    display: 'inline-block'
                                                }}>
                                            {igKey}({props.order.ingredients[igKey]}) 
                                        </span>
                                })
    return (
        <div className="Order">
            <p>Customer Name: <strong>{props.order.orderData.name}</strong></p>
            <p>Ingredients: {ingredientSummary}</p>
            <p>Price: <strong>USD {parseFloat(props.order.price).toFixed(2)}</strong></p>
            <p>Delivery Method: <strong>{props.order.orderData.deliveryMethod}</strong></p>
            <p>Customer Email: <strong>{props.order.orderData.email}</strong></p>
        </div>
    )
}

export default Order 