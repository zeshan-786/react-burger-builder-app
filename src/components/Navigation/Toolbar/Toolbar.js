import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import './Toolbar.css'



const Toolbar = (props) => (
    <header className="Toolbar">
        <DrawerToggle openDrawer={props.openDrawer}/>
        <Logo height={"80%"}/>
        <nav className="DesktopOnly">
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
)

export default Toolbar