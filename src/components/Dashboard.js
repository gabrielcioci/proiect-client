import React, {useEffect, useState} from 'react'
import {withRouter} from "react-router";
import DashTable from "./DashTable";
import './Dashboard.scss';
import axios from "axios";
import config from "../config";
import UserPage from "./Layout/UserPage";
import {useCookies} from "react-cookie";
import Page from "./Layout/Page";


const Dashboard = (props) => {
    const [clienti, setClienti] = useState(null)
    const [reparatii, setReparatii] = useState(null)
    const [users, setUsers] = useState(null)
    const [cookies, setCookies] = useCookies(['name'])
    const {token, user_role} = cookies
    const role = user_role.toLowerCase()

    const [visibleTable, setVisibleTable] = useState(role === 'admin' ? 'users' : role === 'asistent' ? 'clienti' : 'reparatii')

    const adminAndAssistent = (role === 'admin' || role === 'asistent')
    const adminOnly = role === 'admin'
    const all = (role === 'admin' || role === 'asistent' || role === 'mecanic')

    const getData = (url, type) => {
        axios.get(`${config.apiUrl}/api/${url}`, {headers: {"Authorization": `Bearer ${token}`}})
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
        }, {
            label: "User ID",
            key: "id"
        },
        {
            label: "Reparatii",
            key: "reparatii"
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
            label: "Status",
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
        <Page id="dashboard">
            <UserPage>
                <div className="table-select">
                    {adminOnly && <div onClick={() => setVisibleTable('users')}
                                       className={`btn ${visibleTable === 'users' && 'active'}`}>Users
                    </div>}
                    {adminAndAssistent && <div onClick={() => setVisibleTable('clienti')}
                                               className={`btn ${visibleTable === 'clienti' && 'active'}`}>Clienti
                    </div>}
                    {all && <div onClick={() => setVisibleTable('reparatii')}
                                 className={`btn ${visibleTable === 'reparatii' && 'active'}`}>Reparatii
                    </div>}
                </div>
                {adminOnly && visibleTable === 'users' &&
                <DashTable rows={users} addUser={true} updateData={getData} userActions={true} cols={usersCols}/>}
                {adminAndAssistent && visibleTable === 'clienti' &&
                <DashTable rows={clienti} updateData={getData} cols={clientiCols}/>}
                {all && visibleTable === 'reparatii' &&
                <DashTable rows={reparatii} updateData={getData} addReparatie={true} completeButton={true}
                           cols={reparatiiCols}/>}
            </UserPage>
        </Page>
    )
}

export default withRouter(Dashboard)