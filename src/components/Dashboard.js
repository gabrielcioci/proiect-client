import React from 'react'
import {useParams} from 'react-router-dom';
import DashTable from "./DashTable";
import './Dashboard.scss';


const Dashboard = (props) => {
    const {role} = useParams();
    const adminCols = [
        {
            label: "Nume",
            key: "nume"
        },
        {
            label: "Prenume",
            key: "prenume"
        },
        {
            label: "Pozitie",
            key: "pozitie"
        },
        {
            label: "Data",
            key: "data"
        }
    ]
    const adminRows = [
        {
            nume: "Frincu",
            prenume: "Horia",
            pozitie: "mecanic",
            data: "22-03-2018",
        },
        {
            nume: "Floria",
            prenume: "Robert",
            pozitie: "boschetar",
            data: "12-04-2018",
        },
        {
            nume: "Rus",
            prenume: "Onisor",
            pozitie: "asistent",
            data: "02-01-2019",
        },
        {
            nume: "Rhoades",
            prenume: "Lana",
            pozitie: "menajera",
            data: "02-01-2019",
        },
        {
            nume: "Malkova",
            prenume: "Mia",
            pozitie: "asistenta",
            data: "02-01-2019",
        },
    ]
    const carsCols = [
        {
            label: "Marca",
            key: "marca"
        },
        {
            label: "Model",
            key: "model"
        },
        {
            label: "An",
            key: "an"
        },
        {
            label: "Pret",
            key: "pret"
        }
    ]
    const carsRows = [
        {
            nume: "Frincu",
            prenume: "Horia",
            pozitie: "mecanic",
            data: "22-03-2018",
        },
        {
            nume: "Floria",
            prenume: "Robert",
            pozitie: "boschetar",
            data: "12-04-2018",
        },
        {
            nume: "Rus",
            prenume: "Onisor",
            pozitie: "asistent",
            data: "02-01-2019",
        },
        {
            nume: "Rhoades",
            prenume: "Lana",
            pozitie: "menajera",
            data: "02-01-2019",
        },
        {
            nume: "Malkova",
            prenume: "Mia",
            pozitie: "asistenta",
            data: "02-01-2019",
        },
    ]
    return (
        <div id="dashboard">
            <DashTable rows={role === 'admin' ? adminRows : carsRows} cols={role === 'admin' ? adminCols : carsCols}
                       userActions={role === 'admin' && true}/>
        </div>
    )
}

export default Dashboard