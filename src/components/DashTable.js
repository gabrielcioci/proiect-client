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
import {useCookies} from "react-cookie";
import ReparationInfo from "./ReparationInfo";
import UserReparation from "./UserReparation";

const DashTable = (props) => {
    const [cookies, setCookie] = useCookies(['name'])
    const {rows, cols, userActions, completeButton, addUser, addReparatie, updateData} = props
    const [modalOpen, setModalOpen] = useState(false)
    const [safeDelete, setSafeDelete] = useState(false)
    const [deleteUser, setDeleteUser] = useState()
    const [step, setStep] = useState(1)
    const [reparatieID, setReparatieID] = useState()
    const [showUserRepatatii, setShowUserReparatii] = useState(false)
    const [userReparatii, setUserReparatii] = useState()

    const getValue = (row, column) => {

        // Get the value
        let value = row[column.key] ? row[column.key] : null
        return value || '-'

    }

    const handleShowReparatii = async (e, id) => {
        await axios.get(`${config.apiUrl}/api/reparatii/byuserid/${id}`, {headers: {"Authorization": `Bearer ${cookies.token}`}})
            .then((res) => {
                setUserReparatii(res.data)
                setModalOpen(true)
            })
            .catch((error) => {
                console.log(error)
            })
        setShowUserReparatii(true)
    }

    const handleSafeDeleteModal = async (e, id) => {
        await axios.get(`${config.apiUrl}/api/users/${id}`, {headers: {"Authorization": `Bearer ${cookies.token}`}})
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
        await axios.delete(`${config.apiUrl}/api/users/${deleteUser.id}`, {headers: {"Authorization": `Bearer ${cookies.token}`}})
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
        setReparatieID('')
        setUserReparatii('')
        setShowUserReparatii(false)
    }

    const handleRepair = async (e, id) => {
        let newReparatie = {}
        await axios.get(`${config.apiUrl}/api/reparatii/${id}`, {headers: {"Authorization": `Bearer ${cookies.token}`}})
            .then(res => {
                newReparatie = {...res.data}
                newReparatie.reparat = true
            })
            .catch((error) => {
                console.log(error)
            })
        await axios.put(`${config.apiUrl}/api/reparatii/${id}`, newReparatie, {headers: {"Authorization": `Bearer ${cookies.token}`}})
            .then(() => {
                updateData("reparatii/", "reparatii")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="dash-table">
            <table cellSpacing="0" cellPadding="0" border="0">
                <tbody>
                <tr>
                    <td>
                        <table cellSpacing="0" cellPadding="0" border="0">
                            <tbody>
                            <tr className="table-heads">
                                {cols && cols.map((col) => (
                                    <th key={col.key} data-title={col.label}>
                                        {col.label}
                                    </th>
                                ))}
                                {userActions && <th className="empty"/>}
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        {rows ?
                            <div className="tablebody-container">
                                <table cellSpacing="0" cellPadding="0" border="0">
                                    <tbody>
                                    {rows.map((row, index) => (
                                        <tr className="table-rows" key={index}>
                                            {cols.map(col => (
                                                <td key={col.key}
                                                    data-title={col.label}>
                                                    {col.key === 'reparat' ? getValue(row, col) === true ?
                                                        <FontAwesomeIcon icon="check"
                                                                         className="repair-done"/> :
                                                        <div className="btn complete-btn"
                                                             onClick={(e) => handleRepair(e, row.id)}>
                                                            <FontAwesomeIcon icon="tools"
                                                                             className="complete-icon"/>
                                                        </div> : col.key === 'reparatii' ?
                                                        <div className="btn show-reparations-modal"
                                                             onClick={(e) => handleShowReparatii(e, row.id)}>Vezi
                                                            reparatii</div> : getValue(row, col)}
                                                    {col.key === 'cost' && '€'}
                                                </td>
                                            ))}
                                            {userActions && <td className="row-actions">
                                                <FontAwesomeIcon className="delete"
                                                                 onClick={(e) => handleSafeDeleteModal(e, row.id)}
                                                                 icon="trash-alt"/>
                                            </td>}
                                        </tr>
                                    ))}
                                    </tbody>
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
                </tbody>
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
                {addReparatie && !reparatieID && <ReparationForm step={step} setStep={setStep} updateData={updateData}
                                                                 setReparatieID={setReparatieID}
                                                                 handleModalClose={handleModalClose}
                                                                 setModalOpen={setModalOpen}/>}
                {reparatieID && <ReparationInfo reparatieID={reparatieID} setReparatieID={setReparatieID}
                                                handleModalClose={handleModalClose}/>}
                {safeDelete && deleteUser && <SafeDelete deleteUser={deleteUser} handleModalClose={handleModalClose}
                                                         handleDelete={handleDelete}/>}
                {showUserRepatatii &&
                <UserReparation userReparatii={userReparatii} handleModalClose={handleModalClose}/>}

            </Modal>
        </div>
    )
}

export default DashTable