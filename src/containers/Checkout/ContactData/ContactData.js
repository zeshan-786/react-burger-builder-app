import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import './ContactData.css'
import axios from '../../../axios_orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                valid: true,
                touched: false,
                validation: {}
            }
        },
        formIsValid: false
    }

    handleOrder = ( event ) => {
        event.preventDefault()

        const formData = {}
        for( let formElementId in this.state.orderForm ){
            formData[formElementId] = this.state.orderForm[formElementId].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token)
    }

    handleInputChange = ( event, inputIdentifier ) => {
        // console.log(event.target.value);
        const updatedOrderForm = { ...this.state.orderForm }
        const updatedElement = { ...updatedOrderForm[inputIdentifier] }
        updatedElement.value = event.target.value
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation )
        updatedElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedElement
        let formIsValid = true
        for( let inputId in updatedOrderForm ){
            formIsValid = updatedOrderForm[inputId].valid && formIsValid
        }
        console.log(formIsValid);
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }

    checkValidity = ( value, rules ) => {
        let isValid = true
        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid
        }
        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.manLength ) {
            isValid = value.length <= rules.manLength && isValid
        }
        return isValid
    }

    render() {
        const formElements = []
        for (const key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form>
                {
                    formElements.map( (formElement, index) =>  
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shoudValidate={ formElement.config.validation }
                            touched={formElement.config.touched}
                            changed={ (event) => this.handleInputChange(event, formElement.id )}/>)
                }
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.handleOrder}>Order</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner/>
        }
        return (
            <div className="ContactData">
                <h4>
                    Enter you Contact Data
                </h4>
                {form}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: ( orderData, token ) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token, 
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))