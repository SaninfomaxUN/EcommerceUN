import NavbarShopper from "../../../Components/Commons/NavbarShopper/NavbarShopper.jsx"
import React, { useEffect, useState } from 'react';
import "./Styles/ProfileSeller.css"
import Cookies from "js-cookie";
import data from "./data/data.js";
import axios from "axios";
import {showAlertSuccess, showConfirmationAlert} from "../../../Components/Commons/Alerts/AlertsModal";

function openPolicy(){
    window.open('https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=4276', 'popup', 'width=600, height=400');
}

const ProfileSeller = () => {

    const idVendedor = Cookies.get("id")

    //Valores Reales
    const [userNIT, setUserNIT] = useState('');
    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('')
    const [userMail, setUserMail] = useState('');
    const [userNum, setUserNum] = useState('');
    const [userDir, setUserDir] = useState('');
    const [userRazon, setUserRazon] = useState('');

    //Valores llenables por el usuario
    const [userNITVar, setUserNITVar] = useState('');
    const [userNameVar, setUserNameVar] = useState('');
    const [userLastNameVar, setUserLastNameVar] = useState('');
    const [userMailVar, setUserMailVar] = useState('');
    const [userNumVar, setUserNumVar] = useState('');
    const [userDirVar, setUserDirVar] = useState('');
    const [userRazonVar, setUserRazonVar] = useState('');

    useEffect(() => {
        getProfile();
    },[]
    )

    //Cargar usuario
    const getProfile = async() => {
        console.log(idVendedor)
        axios.post(process.env.REACT_APP_API +'/getSeller', {idVendedor: idVendedor})
            
            .then(res => {
                //Update values to user values
                console.log(res.data['DataSeller'])
                let seller = res.data['DataSeller']
                setUserNIT(seller['NIT'])
                setUserName(seller['NOMBRE'])
                setUserLastName(seller['APELLIDO'])
                setUserMail(seller['EMAIL'])
                setUserNum(seller['TELEFONO'])
                setUserDir(seller['DIRECCIONPERSONAL'])
                setUserRazon(seller['RAZONSOCIAL'])
                //Var alts
                setUserNITVar(seller['NIT'])
                setUserNameVar(seller['NOMBRE'])
                setUserLastNameVar(seller['APELLIDO'])
                setUserMailVar(seller['EMAIL'])
                setUserNumVar(seller['TELEFONO'])
                setUserDirVar(seller['DIRECCIONPERSONAL'])
                setUserRazonVar(seller['RAZONSOCIAL'])
            })
            .catch(err => {
                console.log(err)
            });
    }

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

        //Update Back end info.
        const updateProfile = async() => {
            console.log(idVendedor)
            axios.post(process.env.REACT_APP_API +'/updateSeller',
            {idVendedor: idVendedor, nombre: userNameVar, apellido: userLastNameVar, nit: userNITVar, telefono: userNumVar, direccionPersonal: userDirVar, razonSocial: userRazonVar, email: userMailVar})
                .then(res => {
                    showAlertSuccess(
                        "Información actualizada con exito!",
                        ()=>{window.location.reload()}
                    )
                })
                .catch(err => {
                    console.log(err)
                });
        }
        updateProfile();

        setShowUpdater(false);
    };

    //Enviar orden de delete a back
    const handleDeleteAccount = () => {
        //Contact with back for deletion
        const deleteProfile = async() => {
            console.log(idVendedor)
            axios.post(process.env.REACT_APP_API +'/deleteSeller',{idVendedor: idVendedor})
                .then(res => {      
                })
                .catch(err => {
                    console.log(err)
                });
        }

        showConfirmationAlert(
            "¿Estas seguro que deseas borrar tu cuenta?",
            "Esta acción no se puede revertir :(",
            "Eliminar",
            "Cuenta eliminada exitósamente!",
            "Esperamos verte de nuevo!",
            ()=>{
                //Logout
                Cookies.remove('token');
                Cookies.remove('role');
                deleteProfile();
                window.location.href = '/';
            }
        )
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
                </span>{userName +' '+ userLastName}</h3>
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