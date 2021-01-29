import React, {Component} from 'react'
import Order from '../../components/Order/CheckoutSummary/Order'
import axios from '../../axios_orders'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

import * as actions from '../../store/actions/index';
import { connect } from "react-redux"
class Orders extends Component {
    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }
    render() {
        let orders = <Spinner/>
        if (!this.props.loading) {
            orders = ( this.props.orders.map( order => {
                return <Order key={order.id} order={order}/>
            })) 
        }
        // let orders = this.props.orders ?( this.props.orders.map( order => {
        //     return <Order key={order.id} order={order}/>
        // }) ): <Spinner/>
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect( mapStateToProps , mapDispatchToProps )(WithErrorHandler(Orders, axios))