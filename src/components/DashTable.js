import React, {useState} from 'react'
import './DashTable.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import config from "../config";
import axios from "axios";

const DashTable = (props) => {
    const userOptions = [
        {value: 'mecanic', label: 'Mecanic'},
        {value: 'asistent', label: 'Asistent'},
    ]
    const {rows, cols, userActions, addUser, addReparatie, updateData} = props
    const [modalOpen, setModalOpen] = useState(false)
    const [nume, setNume] = useState()
    const [prenume, setPrenume] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [cnp, setCNP] = useState()
    const [telefon, setTelefon] = useState()
    const [model, setModel] = useState()
    const [an, setAn] = useState()
    const [cost, setCost] = useState()
    const [detalii, setDetalii] = useState()
    const [post, setPost] = useState(userOptions[0].label)
    const [safeDelete, setSafeDelete] = useState(false)
    const [deleteUser, setDeleteUser] = useState()
    const [step, setStep] = useState(1)
    const [clientType, setClientType] = useState()
    const [clienti, setClienti] = useState()
    const [selectedClient, setSelectedClient] = useState()

    const getValue = (row, column) => {

        // Get the value
        let value = row[column.key] ? row[column.key] : null
        return value || '-'

    }

    const handleSafeDeleteModal = async (e, id) => {
        await axios.get(`${config.apiUrl}/api/users/${id}`)
            .then(res => {
                setDeleteUser(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
        setSafeDelete(true)
        setModalOpen(true)
    }
    const handleDelete = async () => {
        await axios.delete(`${config.apiUrl}/api/users/${deleteUser.id}`)
            .then(() => {
                setDeleteUser(null)
                setSafeDelete(false)
                setModalOpen(false)
                updateData("users/", "users")
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleModalClose = () => {
        setSafeDelete(false)
        setModalOpen(false)
        setStep(1)
    }
    const handleAdd = async () => {
        const user = {
            nume,
            prenume,
            cnp,
            telefon,
            email,
            password,
            post,
        }
        await axios.post(`${config.apiUrl}/api/users`, user)
            .then(res => {
                console.log(res.data)
                updateData("users/", "users")
            })
            .catch(err => {
                console.log(err)
            })
        setModalOpen(false)
    }
    const handleClientType = async (type) => {
        if (type === "existing") {
            setClientType("existing")
            await axios.get(`${config.apiUrl}/api/clienti/`)
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

    return (
        <div className="dash-table">
            <table cellSpacing="0" cellPadding="0" border="0">
                <tr>
                    <td>
                        <table cellSpacing="0" cellPadding="0" border="0">
                            <tr className="table-heads">
                                {cols && cols.map((col) => (
                                    <th key={col.key}>
                                        {col.label}
                                    </th>
                                ))}
                                {userActions && <th className="empty"/>}
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        {rows ?
                            <div className="tablebody-container">
                                <table cellSpacing="0" cellPadding="0" border="0">
                                    {rows.map((row, index) => (
                                        <tr className="table-rows" key={index}>
                                            {cols.map(col => (
                                                <td key={col.key} data-title={col.label}>
                                                    {getValue(row, col)}
                                                </td>
                                            ))}
                                            {userActions && <td className="row-actions">
                                                <FontAwesomeIcon className="delete"
                                                                 onClick={(e) => handleSafeDeleteModal(e, row.id)}
                                                                 icon="trash-alt"/>
                                            </td>}
                                        </tr>
                                    ))}
                                </table>
                            </div> :
                            <div className="loading">
                                <div className="lds-ring">
                                    <div/>
                                    <div/>
                                    <div/>
                                    <div/>
                                </div>
                                <p>Loading data...</p>
                            </div>}
                    </td>
                </tr>
            </table>
            <div className="table-footer">
                {rows && <span><FontAwesomeIcon icon="search"/>{rows.length} rezultate gasite</span>}
                {(addUser || addReparatie) &&
                <div className="btn" onClick={() => setModalOpen(true)}>Adauga</div>}
                <Modal ariaHideApp={false} overlayClassName="modal-overlay" className="modal-content" isOpen={modalOpen}
                       onRequestClose={() => handleModalClose()}>
                    {addUser && !safeDelete && <form className="formular">
                        <h2>Adauga angajat</h2>
                        <p>Introduceti datele angajatului:</p>
                        <Dropdown className={"dropdown"} options={userOptions} onChange={(e) => setPost(e.label)}
                                  value={post ? post : userOptions[0].label} placeholder={"Pozitie"}/>
                        <input type="text" name="nume" placeholder="Nume" onChange={(e) => setNume(e.target.value)}/>
                        <input type="text" name="prenume" placeholder="Prenume"
                               onChange={(e) => setPrenume(e.target.value)}/>
                        <input type="text" name="cnp" placeholder="CNP" onChange={(e) => setCNP(e.target.value)}/>
                        <input type="tel" name="telefon" placeholder="Telefon"
                               onChange={(e) => setTelefon(e.target.value)}/>
                        <input type="email" name="email" placeholder="Email"
                               onChange={(e) => setEmail(e.target.value)}/>
                        <input type="text" name="password" placeholder="Parola"
                               onChange={(e) => setPassword(e.target.value)}/>
                        <div className="buttons">
                            <div className="btn cancel" onClick={() => handleModalClose()}>Anuleaza</div>
                            <div className="btn" onClick={(e) => handleAdd(e)}>Adauga</div>
                        </div>
                    </form>}
                    {addReparatie && <form className="formular">
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
                        {step === 3 && selectedClient && <>
                            <p>Client selectat:</p>
                            <div className="existing-client">
                                <span
                                    className="existing-client-name">{selectedClient.nume} {selectedClient.prenume}</span>
                                <span className="existing-client-id">CNP: {selectedClient.cnp}</span>
                            </div>
                        </>}
                        {step === 3 && <div className="car-data">
                            <p>Introduceti datele masinii:</p>
                            <input type="text" name="model" placeholder="Model"
                                   onChange={(e) => setModel(e.target.value)}/>
                            <input type="number" name="an" placeholder="An fabricatie"
                                   onChange={(e) => setAn(e.target.value)}/>
                            <input type="number" name="cost" placeholder="Cost reparatie (€)"
                                   onChange={(e) => setCost(e.target.value)}/>
                            <textarea name="detalii" placeholder="Detalii reparatie"
                                      onChange={(e) => setDetalii(e.target.value)}/>
                        </div>}
                        {step === 3 && <div className="buttons">
                            <div className="btn cancel" onClick={() => handleModalClose()}>Anuleaza</div>
                            <div className="btn">Adauga</div>
                        </div>}
                    </form>}
                    {safeDelete && deleteUser && <form className="formular safe-delete-form">
                        <h2>Sterge angajat</h2>
                        <p>Esti sigur ca vrei sa stergi acest angajat?</p>
                        <div className="status-field">Nume: <span
                            className="status-value">{deleteUser.nume} {deleteUser.prenume}</span></div>
                        <div className="status-field">ID: <span
                            className="status-value">{deleteUser.id}</span></div>
                        <div className="buttons">
                            <div className="btn cancel" onClick={() => handleModalClose()}>Anuleaza</div>
                            <div className="btn" onClick={() => handleDelete()}>Sterge</div>
                        </div>
                    </form>}
                </Modal>
            </div>
        </div>
    )
}

export default DashTable