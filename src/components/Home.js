import React from 'react';
import './Home.scss'


const Home = (props) => {
    return (
        <section id="home">
            <div className="container">
                <h1>Verifica statusul reparatiei</h1>
                <div className="form">
                    <div className="form-container">
                        <input type="text" placeholder="#Order ID"/>
                        <div className="btn">Cauta</div>
                    </div>
                    {/*<div className="status">In reparatie</div>*/}
                </div>
            </div>
        </section>
    )
}

export default Home