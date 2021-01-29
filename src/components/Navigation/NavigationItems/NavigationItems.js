import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
// import { NavLink } from 'react-router-dom'

import './NavigationItems.css'

const NavigationItems = ( props ) => (
    <ul className="NavigationItems">
        <NavigationItem link={"/"} exact >Burger Builder</NavigationItem>
        { !props.isAuthenticated ?
            <NavigationItem link={"/auth"}>Authenticate</NavigationItem> : 
            (
            <>
                <NavigationItem link={"/orders"}>Orders</NavigationItem>
                <NavigationItem link={"/logout"}>Logout</NavigationItem>
            </>
            )
        }
    </ul>
)

export default NavigationItems