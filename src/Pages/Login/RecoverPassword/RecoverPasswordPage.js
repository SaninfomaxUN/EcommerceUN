import React, {useState} from 'react'
import RecoverPassword from './RecoverPassword'
import TwoFA from "../../2FA/TwoFA";
import {doVerification2FA} from "../../2FA/TwoFAFunction";
import RestorePassword from "./Components/RestorePassword";
import axios from "axios";
import {showAlertInfo} from "../../../Components/Commons/Alerts/AlertsModal";
import {useNavigate} from "react-router-dom";


let checkExisting = false
export const checkExistingUser = async (credential, checked, nav) => {
    let url
    if (checked) {
        url = process.env.REACT_APP_API +"/checkExistingSeller"
    } else {
        url = process.env.REACT_APP_API +"/checkExistingShopper"
    }
    await axios.post(url, credential)
        .then(() => {
                showAlertInfo("El correo ingresado NO se encuentra registrado!")
                nav('/Login')
            }
        )
        .catch(() => {
            checkExisting = true
        });
    return checkExisting

};

const RecoverPasswordPage = () => {
    const navigate = useNavigate();
    const [open2FA, setOpen2FA] = React.useState(false);
    const [openRestore, setOpenRestore] = React.useState(false);
    const [checked, setChecked] = useState(false);
    const [credential, setCredential] = useState({
        email: '',
        newPassword: '',
        idComprador: 0,
        nit: 0

    })

    const switchHandler = (event) => {
        setChecked(event.target.checked);
        console.log(event.target.checked)
    };


    const recoverPassword = (verification) => {
        if (verification) {
            setOpen2FA(false)
            setOpenRestore(true)

        }
    };


    const handleChange = (e) => {
        setCredential({
            ...credential,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const check = await checkExistingUser(credential, checked, navigate)
        if (!check) {
            return;
        }
        credential.nombre = "Usuario"
        doVerification2FA(credential).then(r => {
            setOpen2FA(true)
            setOpenRestore(false)
        })


    }


    return (
        <div className='all fullWidthBackground'>
            <RecoverPassword
                data={credential}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                switchHandler={switchHandler}
            />
            <TwoFA open={open2FA} close={() => setOpen2FA(false)} dataToSend={credential}
                   verifySignUp={recoverPassword}/>
            <RestorePassword open={openRestore} close={() => setOpenRestore(false)} credential={credential}
                             check={checked}/>

        </div>
    )
}

export default RecoverPasswordPage;