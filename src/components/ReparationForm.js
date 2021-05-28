import React, {useState} from 'react';
import axios from "axios";
import config from "../config";
import {useCookies} from "react-cookie";

const ReparationForm = props => {
    const [cookies, setCookie] = useCookies(['name'])
    const [clientType, setClientType] = useState()
    const [nume, setNume] = useState()
    const [prenume, setPrenume] = useState()
    const [email, setEmail] = useState()
    const [cnp, setCNP] = useState()
    const [telefon, setTelefon] = useState()
    const [model, setModel] = useState()
    const [an, setAn] = useState()
    const [cost, setCost] = useState()
    const [serie, setSerie] = useState()
    const [detalii, setDetalii] = useState()
    const [clienti, setClienti] = useState()
    const [selectedClient, setSelectedClient] = useState()

    const {handleModalClose, step, setStep, updateData, setReparatieID} = props

    const resetFields = () => {
        setNume('')
        setPrenume('')
        setEmail('')
        setCNP(null)
        setTelefon(null)
        setModel('')
        setAn('')
        setCost(null)
        setSerie('')
        setDetalii('')
        setSelectedClient(null)
    }
    const handleClientType = async (type) => {
        if (type === "existing") {
            setClientType("existing")
            await axios.get(`${config.apiUrl}/api/clienti/`, {headers: {"Authorization": `Bearer ${cookies.token}`}})
                .then(res => {
                    setClienti(res.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        } else setClientType("new")
        setStep(2)
    }
    const handleSelectedClient = (client) => {
        setSelectedClient(client)
        setStep(3)
    }
    const handleAddReparation = async () => {
        let clientID
        if (clientType === 'new') {
            const client = {
                nume,
                prenume,
                cnp,
                telefon,
                email
            }
            await axios.post(`${config.apiUrl}/api/clienti`, client, {headers: {"Authorization": `Bearer ${cookies.token}`}})
                .then(res => {
                    clientID = res.data.id
                    updateData("clienti/", "clienti")
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            clientID = selectedClient.id
        }
        const reparatie = {
            model,
            an,
            serie,
            cost,
            detalii,
            clientID,
            reparat: false,
        }
        await axios.post(`${config.apiUrl}/api/reparatii`, reparatie, {headers: {"Authorization": `Bearer ${cookies.token}`}})
            .then(res => {
                setReparatieID(res.data.id)
                updateData("reparatii/", "reparatii")
                resetFields()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <form className="formular">
            <h2>Inregistreaza reparatie</h2>
            {step === 1 && <div className="client-type">
                <p>Alegeti tipul de client:</p>
                <div className="btn" onClick={(e) => handleClientType("new")}>Client nou</div>
                <div className="btn" onClick={(e) => handleClientType("existing")}>Client existent</div>
            </div>}
            {step === 2 && clientType === "existing" &&
            <div className="existing-clients">
                <p>Alegeti clientul:</p>
                <div className="existing-clients-container">
                    {clienti.map(client => (
                        <div className="existing-client" onClick={() => handleSelectedClient(client)}
                             key={client.cnp}>
                            <span className="existing-client-name">{client.nume} {client.prenume}</span>
                            <span className="existing-client-id">CNP: {client.cnp}</span>
                        </div>
                    ))}
                </div>
            </div>}
            {step === 2 && clientType === "new" &&
            <div className="new-client">
                <p>Introduceti datele clientului:</p>
                <div className="new-client">
                    <input type="text" name="nume" placeholder="Nume"
                           onChange={(e) => setNume(e.target.value)}/>
                    <input type="text" name="prenume" placeholder="Prenume"
                           onChange={(e) => setPrenume(e.target.value)}/>
                    <input type="text" name="cnp" placeholder="CNP"
                           onChange={(e) => setCNP(e.target.value)}/>
                    <input type="tel" name="telefon" placeholder="Telefon"
                           onChange={(e) => setTelefon(e.target.value)}/>
                    <input type="email" name="email" placeholder="Email"
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </div>}
            {step === 3 && selectedClient && <>
                <p>Client selectat:</p>
                <div className="existing-client">
                                <span
                                    className="existing-client-name">{selectedClient.nume} {selectedClient.prenume}</span>
                    <span className="existing-client-id">CNP: {selectedClient.cnp}</span>
                </div>
            </>}
            {step === 3 && clientType === 'new' && <>
                <p>Client selectat:</p>
                <div className="existing-client">
                                <span
                                    className="existing-client-name">{nume} {prenume}</span>
                    <span className="existing-client-id">CNP: {cnp}</span>
                </div>
            </>}
            {step === 3 && <div className="car-data">
                <p>Introduceti datele masinii:</p>
                <input type="text" name="model" placeholder="Model"
                       onChange={(e) => setModel(e.target.value)}/>
                <input type="text" name="an" placeholder="An fabricatie"
                       onChange={(e) => setAn(parseInt(e.target.value))}/>
                <input type="text" name="serie" placeholder="Serie sasiu (VIN)"
                       onChange={(e) => setSerie(e.target.value)}/>
                <input type="text" name="cost" placeholder="Cost reparatie (€)"
                       onChange={(e) => setCost(parseInt(e.target.value))}/>
                <textarea name="detalii" placeholder="Detalii reparatie"
                          onChange={(e) => setDetalii(e.target.value)}/>
            </div>}
            <div className="buttons">
                {step === 2 && clientType === "new" && nume && prenume && telefon && email && cnp &&
                <div className="btn" onClick={() => setStep(3)}>Inainte</div>}
                {step === 3 && <>
                    <div className="btn cancel" onClick={() => handleModalClose()}>Anuleaza</div>
                    <div className="btn" onClick={() => handleAddReparation()}>Adauga</div>
                </>}
            </div>
        </form>
    )
}

export default ReparationForm