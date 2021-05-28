import React from 'react'
import {withRouter} from "react-router";
import Header from "../Header";

const Page = (props) => {
    return (
        <>
            <Header/>
            <div id={props.id && props.id}>
                {props.children}
            </div>
        </>
    )
}

export default withRouter(Page)