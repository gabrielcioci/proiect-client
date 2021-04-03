import React from 'react'
import './components/Icons/FontAwesome'
import {BrowserRouter as Router, Route} from "react-router-dom"
import {ToastContainer} from "react-toastify";
import Header from "./components/Header";
import Home from '../src/components/Home'
import Login from '../src/components/Login'
import Dashboard from '../src/components/Dashboard'

function App() {
    return (
        <Router>
            <Header/>
            <ToastContainer/>
            <Route path="/" exact component={Home}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/dashboard/:role" exact component={Dashboard}/>
        </Router>
    );
}

export default App;
