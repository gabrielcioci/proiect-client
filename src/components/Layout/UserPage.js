import React from 'react'
import {useCookies} from "react-cookie";
import {withRouter} from "react-router";

const UserPage = (props) => {
    const [cookies, setCookie] = useCookies(['name'])
    return (
        <>
            {cookies.token ? props.children : props.history.push("/")}
        </>
    )
}

export default withRouter(UserPage)