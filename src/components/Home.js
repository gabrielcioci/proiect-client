import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withRouter} from "react-router";
import './Home.scss'
import axios from "axios";
import config from "../config";
import Modal from "react-modal";
import Page from "./Layout/Page";


const Home = (props) => {
    const [id, setId] = useState('')
    const [reparatie, setReparatie] = useState(null)
    const [status, setStatus] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [verificat, setVerificat] = useState(false)

    const verificaReparatie = async (e, id) => {
        e.preventDefault()
        await axios.get(`${config.apiUrl}/api/reparatii/${id}`)
            .then(response => {
                setReparatie(response.data)
                if (response.data.reparat) {
                    setStatus(true)
                    setModalOpen(true)
                } else {
                    setStatus(false)
                }
            })
            .catch((error) => {
                console.log(error)
                setStatus(false)
            })
        setVerificat(true)
    }

    const handleChange = (id) => {
        setVerificat(false)
        setReparatie(null)
        setId(id)
    }


    return (
        <Page id="home">
            <div className="container">
                <h1>Verifica statusul reparatiei</h1>
                <form className="form">
                    <div className="form-container">
                        <input type="text" required onChange={(e) => handleChange(e.target.value)}
                               placeholder="ID Reparatie"/>
                        <button className={`btn ${id && "show"}`}
                                onClick={(e) => verificaReparatie(e, id)}>Cauta<FontAwesomeIcon
                            icon="search"/>
                        </button>
                    </div>
                    {verificat && id && <div className="status">
                        {reparatie ?
                            status ?
                                <Modal overlayClassName="modal-overlay" className="modal-content" isOpen={modalOpen}
                                       onRequestClose={() => setModalOpen(false)}>
                                    <h2>Reparatia este gata!</h2>
                                    <div className="status-field">Model: <span
                                        className="status-value">{reparatie.model}, {reparatie.an}</span></div>
                                    <div className="status-field">Cost reparatie: <span
                                        className="status-value">{reparatie.cost} lei</span></div>
                                    <div className="status-field">Detalii: <span
                                        className="status-value">{reparatie.detalii}</span></div>
                                </Modal> : <div className="short-message progress">Status: in reparatie ...</div> :
                            <div className="short-message failed">ID-ul este invalid sau nu exista!</div>}
                    </div>}
                </form>
            </div>
        </Page>
    )
}

export default withRouter(Home)