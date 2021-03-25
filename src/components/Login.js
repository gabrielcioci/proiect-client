import React from 'react'
import './Login.scss';

const Login = (props) => {
    return (
        <div id="login">
            <form className="login-form">
                <h2>Autentificare</h2>
                <input type="text" required name="username" placeholder="Username"/>
                <input type="password" name="password" placeholder="Password"/>
                <button className="btn" type="submit">Log in</button>
            </form>
        </div>
    )
}

export default Login