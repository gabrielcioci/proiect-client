import React from 'react';
import {Link} from 'react-router-dom'
import './Header.scss'
import logo from '../assets/logo.png'

const Header = (props) => {
    return (
        <header>
            <Link to="/"><img src={logo} alt="logo"/></Link>
            <div className="menu">
                <Link className="menu-link" to="/">Status reparatie</Link>
                <Link className="menu-link" to="/login">Login</Link>
                <Link className="menu-link" to="/dashboard/admin">Admin</Link>
                <Link className="menu-link" to="/dashboard/asistent">Asistent</Link>
                <Link className="menu-link" to="/dashboard/mecanic">Mecanic</Link>
            </div>
        </header>
    )
}

export default Header