import React from 'react';

const ReparationInfo = props => {
    const {handleModalClose, reparatieID} = props
    return (
        <form className="formular">
            <h2>Reparatie inregistrata!</h2>
            <p>Reparatie inregistrata cu success. Pentru a verifica statusul reparatiei puteti folosii urmatorul ID:</p>
            <div className="reparation-info">ID:<span>{reparatieID}</span></div>
            <div className="btn cancel" onClick={() => handleModalClose()}>Inchide</div>
        </form>
    )
}

export default ReparationInfo