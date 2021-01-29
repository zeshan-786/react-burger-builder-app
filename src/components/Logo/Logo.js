import React from 'react'
import burgerLogo from '../../assets/images/burger_logo.png'
import './Logo.css'

const Logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img alt="Logo" src={burgerLogo}></img>
    </div>
)

export default Logo