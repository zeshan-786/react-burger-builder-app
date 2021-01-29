import React, { Component } from 'react'
import './Layout.css'
import Aux from '../../hoc/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    handlerSideDrawerClosed = () => {
        this.setState({showSideDrawer: false})
    }

    handlerSideDrawerOpen = ( ) => {
        this.setState( (prevState)=> {
           return{ showSideDrawer: !prevState.showSideDrawer
}        })
    }

    render(){
        return (
            <Aux>
                <Toolbar 
                        openDrawer={this.handlerSideDrawerOpen}
                        isAuthenticated={this.props.isAuthenticated} />
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.handlerSideDrawerClosed}
                    isAuthenticated={this.props.isAuthenticated}/>
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)
