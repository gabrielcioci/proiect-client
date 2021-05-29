import React from 'react';

const UserReparation = props => {
    const {handleModalClose, userReparatii} = props
    return (
        <form className="formular">
            <h2>Reparatii:</h2>
            <p>Toate reparatiile userului.</p>
            {userReparatii.map(rep => (
                <div className="reparatie">
                    <div className="top">
                        <span>{rep.model}</span>
                        <span>{rep.an}</span>
                        <span>{rep.cost}€</span>
                    </div>
                    <div className="detalii">
                        Detalii: {rep.detalii}
                    </div>
                    <div className="status">
                        Status: <span
                        className={rep.reparat && 'reparat'}>{rep.reparat ? 'Reparat' : 'In curs de reparatie...'}</span>
                    </div>
                </div>
            ))}
            <div className="btn cancel" onClick={() => handleModalClose()}>Inchide</div>
        </form>
    )
}

export default UserReparation