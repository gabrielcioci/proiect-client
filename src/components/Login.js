import React, {useState} from 'react'
import {withRouter} from 'react-router';
import {useCookies} from "react-cookie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import config from "../config";
import './Login.scss';

const Login = (props) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState(false)
    const [cookies, setCookie] = useCookies(['name'])

    const handleChange = (setter, e) => {
        if (error) setError(false)
        setter(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userCredentials = {
            email,
            password
        }
        await axios.post(`${config.apiUrl}/api/users/auth`, userCredentials)
            .then(res => {
                setCookie('token', res.data.token, {path: '/'})
                setCookie('user_id', res.data.id, {path: '/'})
                setCookie('user_role', res.data.post, {path: '/'})
                props.history.push(`/dashboard/${res.data.post.toLowerCase()}`)
            })
            .catch(err => {
                setError(true)
            })
    }

    return (
        <div id="login">
            <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                <h2>Autentificare</h2>
                <div className="input">
                    <FontAwesomeIcon icon="user"/>
                    <input type="email" required name="email" onChange={(e) => handleChange(setEmail, e)}
                           placeholder="Email"/>
                </div>
                <div className="input">
                    <FontAwesomeIcon icon="lock"/>
                    <input type="password" name="password" onChange={(e) => handleChange(setPassword, e)}
                           placeholder="Password"/>
                </div>
                {error && <span className="error">Email sau parola incorecte!</span>}
                <button className="btn" type="submit">Log in</button>
            </form>
        </div>
    )
}

export default withRouter(Login)