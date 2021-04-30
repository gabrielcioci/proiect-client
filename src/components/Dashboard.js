import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import DashTable from "./DashTable";
import './Dashboard.scss';
import axios from "axios";
import config from "../config";


const Dashboard = (props) => {
    const {role} = useParams();
    const [clienti, setClienti] = useState(null)
    const [reparatii, setReparatii] = useState(null)
    const [angajati, setAngajati] = useState(null)
    const [masini, setMasini] = useState(null)
    const [visibleTable, setVisibleTable] = useState(role === 'admin' ? 'angajati' : role === 'asistent' ? 'clienti' : 'reparatii')

    const adminAndAssistent = (role === 'admin' || role === 'asistent')
    const adminOnly = role === 'admin'
    const all = (role === 'admin' || role === 'asistent' || role === 'mecanic')

    useEffect(() => {
        adminAndAssistent && axios.get(`${config.apiUrl}/api/users/`)
            .then(res => {
                setClienti(res.data)
            })
        all && axios.get(`${config.apiUrl}/api/reparatii/`)
            .then(res => {
                setReparatii(res.data)
            })
        adminOnly && axios.get(`${config.apiUrl}/api/angajati/`)
            .then(res => {
                setAngajati(res.data)
            })
        adminAndAssistent && axios.get(`${config.apiUrl}/api/cars/`)
            .then(res => {
                setMasini(res.data)
            })
    }, [])

    const clientiCols = [
        {
            label: "Prenume",
            key: "prenume"
        },
        {
            label: "Nume",
            key: "nume"
        },
        {
            label: "Telefon",
            key: "telefon"
        },
        {
            label: "CNP",
            key: "cnp"
        }
    ]
    const masiniCols = [
        {
            label: "Model",
            key: "model"
        },
        {
            label: "An",
            key: "an"
        },
        {
            label: "Culoare",
            key: "culoare"
        },
        {
            label: "Putere",
            key: "cp"
        },
        {
            label: "Pret",
            key: "pret"
        }
    ]
    const reparatiiCols = [
        {
            label: "Model",
            key: "model"
        },
        {
            label: "An",
            key: "an"
        },
        {
            label: "Cost",
            key: "cost"
        },
        {
            label: "Detalii",
            key: "detalii"
        },
        {
            label: "Complet",
            key: "reparat"
        }
    ]
    const angajatiCols = [
        {
            label: "Rol",
            key: "post"
        },
        {
            label: "Prenume",
            key: "prenume"
        },
        {
            label: "Nume",
            key: "nume"
        },
        {
            label: "Telefon",
            key: "telefon"
        },
        {
            label: "Email",
            key: "email"
        },
        {
            label: "CNP",
            key: "cnp"
        }
    ]

    return (
        <div id="dashboard">
            <div className="table-select">
                {adminOnly && <div onClick={() => setVisibleTable('angajati')}
                                   className={`btn ${visibleTable === 'angajati' && 'active'}`}>Angajati
                </div>}
                {adminAndAssistent && <div onClick={() => setVisibleTable('clienti')}
                                           className={`btn ${visibleTable === 'clienti' && 'active'}`}>Clienti
                </div>}
                {adminAndAssistent && <div onClick={() => setVisibleTable('masini')}
                                           className={`btn ${visibleTable === 'masini' && 'active'}`}>Masini
                </div>}
                {all && <div onClick={() => setVisibleTable('reparatii')}
                             className={`btn ${visibleTable === 'reparatii' && 'active'}`}>Reparatii
                </div>}
            </div>
            {adminAndAssistent && visibleTable === 'clienti' && <DashTable rows={clienti} cols={clientiCols}/>}
            {adminOnly && visibleTable === 'angajati' && <DashTable rows={angajati} cols={angajatiCols}/>}
            {adminAndAssistent && visibleTable === 'masini' && <DashTable rows={masini} cols={masiniCols}/>}
            {all && visibleTable === 'reparatii' && <DashTable rows={reparatii} cols={reparatiiCols}/>}
        </div>
    )
}

export default Dashboard