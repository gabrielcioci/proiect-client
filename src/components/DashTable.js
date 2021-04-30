import React, {useState} from 'react'
import './DashTable.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const DashTable = (props) => {

    const {rows, cols, userActions} = props
    const [modalOpen, setModalOpen] = useState(false)
    const [nume, setNume] = useState('')
    const [prenume, setPrenume] = useState('')
    const [adresa, setAdresa] = useState('')
    const [cnp, setCNP] = useState('')
    const [telefon, setTelefon] = useState('')
    const [pozitie, setPozitie] = useState('')
    const angajatOptions = [
        {value: 'mecanic', label: 'Mecanic'},
        {value: 'asistent', label: 'Asistent'},
    ]
    const getValue = (row, column) => {

        // // Call the cell render
        // if (column.render) return column.render(row)

        // Get the value
        let value = row[column.key] ? row[column.key] : null
        return value || '-'

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
                        <div className="tablebody-container">
                            <table cellSpacing="0" cellPadding="0" border="0">
                                {rows && rows.map((row, index) => (
                                    <tr className="table-rows" key={index}>
                                        {cols.map(col => (
                                            <td key={col.key} data-title={col.label}>
                                                {getValue(row, col)}
                                            </td>
                                        ))}
                                        {userActions && <td className="row-actions">
                                            <FontAwesomeIcon className="edit" icon="user-edit"/>
                                            <FontAwesomeIcon className="delete" icon="trash-alt"/>
                                        </td>}
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
            <div className="table-footer">
                {rows && <span><FontAwesomeIcon icon="search"/>{rows.length} rezultate gasite</span>}
                {userActions &&
                <div className="btn" onClick={() => setModalOpen(true)}>Adauga</div>}
                <Modal overlayClassName="modal-overlay" className="modal-content" isOpen={modalOpen}
                       onRequestClose={() => setModalOpen(false)}>
                    <form className="formular-angajare">
                        <h2>Adauga angajat</h2>
                        <p>Introduceti datele angajatului:</p>
                        <input type="text" name="nume" placeholder="Nume" onChange={(e) => setNume(e.target.value)}/>
                        <input type="text" name="prenume" placeholder="Prenume"
                               onChange={(e) => setPrenume(e.target.value)}/>
                        <input type="text" name="adresa" placeholder="Adresa"
                               onChange={(e) => setAdresa(e.target.value)}/>
                        <input type="text" name="cnp" placeholder="CNP" onChange={(e) => setCNP(e.target.value)}/>
                        <input type="tel" name="telefon" placeholder="Telefon"
                               onChange={(e) => setTelefon(e.target.value)}/>
                        <Dropdown className={"dropdown"} options={angajatOptions} onChange={(e) => setPozitie(e.label)}
                                  value={pozitie ? pozitie : angajatOptions[0].label} placeholder={"Pozitie"}/>
                        <button className="btn">Adauga</button>
                    </form>
                </Modal>
            </div>
        </div>
    )
}

export default DashTable