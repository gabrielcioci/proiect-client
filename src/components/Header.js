import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import './Header.scss'
import logo from '../assets/logo.png'
import {useCookies} from "react-cookie";
import {withRouter} from "react-router";

const Header = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['name'])
    const {token, user_role} = cookies
    const [loggedUser, setLoggedUser] = useState(token && true)
    const handleLogout = () => {
        removeCookie('token')
        removeCookie('user_id')
        removeCookie('user_role')
        setLoggedUser(false)
        props.history.push('/')
    }
    return (
        <header>
            <Link to="/"><img src={logo} alt="logo"/></Link>
            <div className="menu">
                <Link className="menu-link" to="/">Status reparatie</Link>
                {loggedUser ? <div className="menu-link" onClick={() => handleLogout()}>Log out</div> :
                    <Link className="menu-link" to="/login">Login</Link>}
                {user_role === 'admin' ? <Link className="menu-link" to="/dashboard/admin">Admin</Link> :
                    user_role === 'asistent' ? <Link className="menu-link" to="/dashboard/asistent">Asistent</Link> :
                        user_role === 'mecanic' ?
                            <Link className="menu-link" to="/dashboard/mecanic">Mecanic</Link> : null}
            </div>
        </header>
    )
}

export default withRouter(Header)