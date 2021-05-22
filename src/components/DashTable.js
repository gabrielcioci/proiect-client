import React, {useState} from 'react'
import './DashTable.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';
import 'react-dropdown/style.css';
import config from "../config";
import axios from "axios";
import SafeDelete from "./SafeDelete";
import ReparationForm from "./ReparationForm";
import AddUserForm from "./AddUserForm";

const DashTable = (props) => {
    const {rows, cols, userActions, addUser, addReparatie, updateData} = props
    const [modalOpen, setModalOpen] = useState(false)
    const [safeDelete, setSafeDelete] = useState(false)
    const [deleteUser, setDeleteUser] = useState()
    const [step, setStep] = useState(1)
    const [reparatieID, setReparatieID] = useState()

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
            </div>
            <Modal ariaHideApp={false} overlayClassName="modal-overlay" className="modal-content" isOpen={modalOpen}
                   onRequestClose={() => handleModalClose()}>
                {addUser && !safeDelete &&
                <AddUserForm handleModalClose={handleModalClose} updateData={updateData}/>}
                {addReparatie &&
                <ReparationForm step={step} setStep={setStep} updateData={updateData}
                                setReparatieID={setReparatieID}
                                handleModalClose={handleModalClose} setModalOpen={setModalOpen}/>}
                {reparatieID && <div className="reparation-id-modal">
                    <h2>Reparatie inregistrata!</h2>
                    <p>Reparatia a fost inregistrata cu success. Pentru a verifica statusul reparatie clientul poate
                        folosii urmatorul ID:</p>
                    <div className="reparation-id">{reparatieID}</div>
                </div>}
                {safeDelete && deleteUser && <SafeDelete deleteUser={deleteUser} handleModalClose={handleModalClose}
                                                         handleDelete={handleDelete}/>}

            </Modal>
        </div>
    )
}

export default DashTable