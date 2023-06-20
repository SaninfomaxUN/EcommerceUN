import NavbarShopper from "../../../Components/Commons/NavbarShopper/NavbarShopper.jsx"
import React, { useEffect, useState } from 'react';
import "./Styles/Profile.css"
import Cookies from "js-cookie";
import axios from "axios";
import {showAlertSuccess, showConfirmationAlert} from "../../../Components/Commons/Alerts/AlertsModal";

function openPolicy(){
    window.open('https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=4276', 'popup', 'width=600, height=400');
}

const Profile = () => {

    const idComprador = Cookies.get("id")

    //Valores Reales
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('')
    const [userMail, setUserMail] = useState('');
    const [userNum, setUserNum] = useState('');

    //Valores llenables por el usuario
    const [userNameVar, setUserNameVar] = useState('');
    const [userLastNameVar, setUserLastNameVar] = useState('');
    const [userMailVar, setUserMailVar] = useState('');
    const [userNumVar, setUserNumVar] = useState('');

    useEffect(() => {
        getProfile();
    },[]
    )

    //Cargar usuario
    const getProfile = async() => {
        console.log(idComprador)
        axios.post(process.env.REACT_APP_API +'/getShopper', {idComprador: idComprador})
            
            .then(res => {
                //Update values to user values
                let shopper = res.data['DataShopper']
                setUserId(shopper['ID_COMPRADOR'])
                setUserName(shopper['NOMBRE'])
                setUserLastName(shopper['APELLIDO'])
                setUserMail(shopper['EMAIL'])
                setUserNum(shopper['TELEFONO'])
                //Var alts
                setUserNameVar(shopper['NOMBRE'])
                setUserLastNameVar(shopper['APELLIDO'])
                setUserMailVar(shopper['EMAIL'])
                setUserNumVar(shopper['TELEFONO'])
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
    const handleNameChange = (event) => {setUserNameVar(event.target.value);};
    const handleLastNameChange = (event) => {setUserLastNameVar(event.target.value);};
    const handleMailChange = (event) => {setUserMailVar(event.target.value);};
    const handleNumChange = (event) => {setUserNumVar(event.target.value);};

    //Enviar info nueva a back
    const handleSubmit = (event) => {
        event.preventDefault();

        //Update Back end info.
        const updateProfile = async() => {
            console.log(idComprador)
            axios.post(process.env.REACT_APP_API +'/updateShopper',
            {idComprador: idComprador, nombre: userNameVar, apellido: userLastNameVar, telefono: userNumVar, email: userMailVar})
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
            console.log(idComprador)
            axios.post(process.env.REACT_APP_API +'/deleteShopper',{idComprador: idComprador})
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
                    <span className="material-symbols-outlined">demography</span>
                    <p>{userId}</p>
                    <span className="material-symbols-outlined">phone</span>
                    <p>{userNum}</p>

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

export default Profile