import React from 'react'
import Aux from '../../../hoc/Aux'
import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/Backdrop/Backdrop'
import NavigationItems from '../NavigationItems/NavigationItems'
import './SideDrawer.css'

const SideDrawer = (props) => {
    let classes = ['SideDrawer', 'Close']
    if (props.open) {
        classes = ['SideDrawer', 'Open']   
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={classes.join(' ')} onClick={props.closed}>
            <Logo height={"11%"}/>
            <nav>
                <NavigationItems isAuthenticated={props.isAuthenticated}/>
            </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer