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
    const [users, setUsers] = useState(null)
    const [masini, setMasini] = useState(null)
    const [visibleTable, setVisibleTable] = useState(role === 'admin' ? 'users' : role === 'asistent' ? 'clienti' : 'reparatii')

    const adminAndAssistent = (role === 'admin' || role === 'asistent')
    const adminOnly = role === 'admin'
    const all = (role === 'admin' || role === 'asistent' || role === 'mecanic')

    const getData = (url, type) => {
        axios.get(`${config.apiUrl}/api/${url}`)
            .then(res => {
                switch (type) {
                    case "clienti":
                        setClienti(res.data)
                        break;
                    case "reparatii":
                        setReparatii(res.data)
                        break;
                    case "users":
                        setUsers(res.data)
                        break;
                    case "masini":
                        setMasini(res.data)
                        break;

                    default:
                }

            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        adminAndAssistent && getData("clienti/", "clienti")
        all && getData("reparatii/", "reparatii")
        adminOnly && getData("users/", "users")
        adminAndAssistent && getData("cars/", "masini")
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
    const usersCols = [
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
                {adminOnly && <div onClick={() => setVisibleTable('users')}
                                   className={`btn ${visibleTable === 'users' && 'active'}`}>Users
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
            {adminOnly && visibleTable === 'users' &&
            <DashTable rows={users} addUser={true} updateData={getData} userActions={true} cols={usersCols}/>}
            {adminAndAssistent && visibleTable === 'clienti' &&
            <DashTable rows={clienti} updateData={getData} cols={clientiCols}/>}
            {adminAndAssistent && visibleTable === 'masini' &&
            <DashTable rows={masini} updateData={getData} addMasina={true} cols={masiniCols}/>}
            {all && visibleTable === 'reparatii' &&
            <DashTable rows={reparatii} updateData={getData} addReparatie={true} cols={reparatiiCols}/>}
        </div>
    )
}

export default Dashboard