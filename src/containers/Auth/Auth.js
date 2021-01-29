import React,{ Component } from 'react'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import './Auth.css'

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true, 
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true, 
                    minLength: 7
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }

    handleInputChange = ( event, controlName  ) => {
        const updatedControls = { 
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        }
        this.setState({ controls: updatedControls })

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


    handleSwitchButton = () => {
        this.setState({ isSignup: !this.state.isSignup })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup )
    }

    componentDidMount(){
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }
    }

    render() {
        const formElements = []
        for (const key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElements.map( formElement => {
            return <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shoudValidate={ formElement.config.validation }
                        touched={formElement.config.touched}
                        changed={ (event) => this.handleInputChange(event, formElement.id )}
                    />
        })

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null
        if (this.props.error) {
        errorMessage = <p>{ this.props.error.message }</p>
        }
        let authRedirect = null
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return(
            <div className="Auth">
                {authRedirect}
                { errorMessage }
                <form onSubmit={this.handleSubmit}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger"
                    clicked={this.handleSwitchButton}>Switch to { this.state.isSignup ? 'Signin' : 'Signup' }</Button>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)


