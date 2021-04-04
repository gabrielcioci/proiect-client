import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Login.scss';

const Login = (props) => {
    return (
        <div id="login">
            <form className="login-form">
                <h2>Autentificare</h2>
                <div className="input">
                    <FontAwesomeIcon icon="user"/>
                    <input type="text" required name="username" placeholder="Username"/>
                </div>
                <div className="input">
                    <FontAwesomeIcon icon="lock"/>
                    <input type="password" name="password" placeholder="Password"/>
                </div>
                <button className="btn" type="submit">Log in</button>
            </form>
        </div>
    )
}

export default Login