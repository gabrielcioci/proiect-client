import React from 'react';

const SafeDelete = props => {
    const {nume, prenume, id} = props.deleteUser
    const {handleModalClose, handleDelete} = props
    return (
        <form className="formular safe-delete-form">
            <h2>Sterge angajat</h2>
            <p>Esti sigur ca vrei sa stergi acest angajat?</p>
            <div className="status-field">Nume: <span
                className="status-value">{nume} {prenume}</span></div>
            <div className="status-field">ID: <span
                className="status-value">{id}</span></div>
            <div className="buttons">
                <div className="btn cancel" onClick={() => handleModalClose()}>Anuleaza</div>
                <div className="btn" onClick={() => handleDelete()}>Sterge</div>
            </div>
        </form>
    )
}

export default SafeDelete