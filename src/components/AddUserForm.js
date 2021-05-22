import React, {useState} from 'react'
import Dropdown from "react-dropdown";
import axios from "axios";
import config from "../config";

const AddUserForm = props => {
    const userOptions = [
        {value: 'mecanic', label: 'Mecanic'},
        {value: 'asistent', label: 'Asistent'},
    ]
    const [nume, setNume] = useState()
    const [prenume, setPrenume] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [cnp, setCNP] = useState()
    const [telefon, setTelefon] = useState()
    const [post, setPost] = useState(userOptions[0].label)

    const {handleModalClose, updateData} = props
    const resetFields = () => {
        setNume('')
        setPrenume('')
        setCNP('')
        setTelefon('')
        setEmail('')
        setPassword('')
        setPost('')
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
                resetFields()

            })
            .catch(err => {
                console.log(err)
            })
        handleModalClose()
    }

    return (
        <form className="formular">
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
        </form>
    )
}

export default AddUserForm