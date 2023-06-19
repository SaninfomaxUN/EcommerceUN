import NavbarShopper from "../../../Components/Commons/NavbarShopper/NavbarShopper.jsx"
import React, { useState } from 'react';
import "./Styles/ProfileSeller.css"
import Cookies from "js-cookie";
import data from "./data/data.js";

function openPolicy(){
    window.open('https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=4276', 'popup', 'width=600, height=400');
}

const ProfileSeller = () => {
    //Valores Reales
    const [userNIT, setUserNIT] = useState(data[0].ID_VENDEDOR);
    const [userName, setUserName] = useState(`${data[0].NOMBRE} ${data[0].APELLIDO}`);
    const [userMail, setUserMail] = useState(data[0].EMAIL);
    const [userNum, setUserNum] = useState(data[0].TELEFONO);
    
    const [userDir, setUserDir] = useState(data[0].DIRECCIONPERSONAL);
    const [userRazon, setUserRazon] = useState(data[0].RAZONSOCIAL);

    //Valores llenables por el usuario
    const [userNITVar, setUserNITVar] = useState('NIT actual');
    const [userNameVar, setUserNameVar] = useState('Nombre');
    const [userLastNameVar, setUserLastNameVar] = useState('Apellidos');
    const [userMailVar, setUserMailVar] = useState('Correo Electronico');
    const [userNumVar, setUserNumVar] = useState('Numero Celular');
    const [userDirVar, setUserDirVar] = useState('Dirección');
    const [userRazonVar, setUserRazonVar] = useState('Razón Social');

    //Ventana de actulizar datos
    const [showUpdater, setShowUpdater] = useState(false);
    const handleButton = () => {
        setShowUpdater(true);
    };

    //Ventana de eliminar cuenta
    const [showDelete, setShowDelete] = useState(false);
    const handleDelete = () => {
        setShowDelete(true);
    };
    const cancelDelete = () => {
        setShowDelete(false);
    }

    //Permitir editar texto
    const handleNITChange = (event) => {setUserNITVar(event.target.value);};
    const handleNameChange = (event) => {setUserNameVar(event.target.value);};
    const handleLastNameChange = (event) => {setUserLastNameVar(event.target.value);};
    const handleMailChange = (event) => {setUserMailVar(event.target.value);};
    const handleNumChange = (event) => {setUserNumVar(event.target.value);};
    const handleDirChange = (event) => {setUserDirVar(event.target.value);};
    const handleRazonChange = (event) => {setUserRazonVar(event.target.value);};

    //Enviar info nueva a back
    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the input value, e.g., send it to an API

        //Prueba Temporal.
        setUserNIT(userNITVar);
        setUserName(FullUserName => userNameVar+ ' '+userLastNameVar);
        setUserMail(userMailVar);
        setUserNum(userNumVar);
        setUserDir(userDirVar);
        setUserRazon(userRazonVar);

        console.log('Input value:', userNameVar, userMailVar, userNumVar);

        setShowUpdater(false);

        //refrescar ventana con datos nuevos
        //window.location.reload();
    };

    //Enviar orden de delete a back
    const handleDeleteAccount = () => {
        //How on earth do you drop the acccount from back

        //Logout
        Cookies.remove('token');
        Cookies.remove('role');
        window.location.href = '/';
    }

    return (
        <div>
            <NavbarShopper/>
            <br/>
            <br/>
            <br/>

            <div className="card container cardUser">

                <h3><span className="material-symbols-outlined">
                    account_circle
                </span>{userName}</h3>
            </div>

            <br/>

            <div className="card container cardItems">
                <ul>
                    <li className="itemlist">
                    <span className="material-symbols-outlined">mail</span>
                    <p>{userMail}</p>
                    <span className="material-symbols-outlined">barcode_scanner</span>
                    <p>{userNIT}</p>
                    <span className="material-symbols-outlined">phone</span>
                    <p>{userNum}</p>
                    <span className="material-symbols-outlined">storefront</span>
                    <p>{userDir}</p>
                    <span className="material-symbols-outlined">work</span>
                    <p>{userRazon}</p>

                    {!showUpdater &&(
                        <button className="updateUser" onClick={handleButton}>Actualizar información</button>
                    )}

                    {showUpdater && (
                        <form onSubmit={handleSubmit}>
                        <span className="material-symbols-outlined">settings</span>
                        <br/>
                        
                        <input
                            className="inputBox"
                            type="text"
                            value={userNITVar}
                            onChange={handleNITChange}
                        /><br/>

                        <input
                            className="inputBox"
                            type="text"
                            value={userNameVar}
                            onChange={handleNameChange}
                        /><br/>

                        <input
                            className="inputBox"
                            type="text"
                            value={userLastNameVar}
                            onChange={handleLastNameChange}
                        /><br/>

                        <input
                            className="inputBox"
                            type="text"
                            value={userMailVar}
                            onChange={handleMailChange}
                        /><br/>

                        <input
                            className="inputBox"
                            type="text"
                            value={userNumVar}
                            onChange={handleNumChange}
                        /><br/>

                        <input
                            className="inputBox"
                            type="text"
                            value={userDirVar}
                            onChange={handleDirChange}
                        /><br/>

                        <input
                            className="inputBox"
                            type="text"
                            value={userRazonVar}
                            onChange={handleRazonChange}
                        /><br/>

                        <button className="updateUser">Enviar</button>
                        </form>
                    )}

                    </li>
                    <br/>

                    <li className="itemlist">
                    <span className="material-symbols-outlined">privacy_tip</span>
                    <a href="#" className="itemData" onClick={openPolicy}>Política de Privacidad</a>
                    </li>
                </ul>
            </div>
            <br/>

            <div className="card container cardItems">
                <ul>
                    {!showDelete &&(
                        <button className="deleteUser" onClick={handleDelete}>Eliminar Cuenta</button>
                    )}
                    {showDelete && (
                        <button className="deleteUser" onClick={handleDeleteAccount}>Continuar</button>
                    )}
                    {showDelete && (
                        <button className="deleteUser" onClick={cancelDelete} style={{ marginLeft: '8px'}}>Mejor No</button> 
                    )}
                    
                </ul>
            </div>           


        </div>
    )
}

export default ProfileSeller