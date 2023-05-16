import React, {useState} from 'react'
import RecoverPassword from './RecoverPassword'
import TwoFA from "../../2FA/TwoFA";
import {doVerification2FA} from "../../2FA/TwoFAFunction";
import RestorePassword from "./Components/RestorePassword";



const RecoverPasswordPage = () => {
    const [open2FA, setOpen2FA] = React.useState(false);
    const [openRestore, setOpenRestore] = React.useState(false);
    const [checked, setChecked] = useState(false);
    const [credential, setCredential] = useState({
        email: '',
        newPassword: ''

    })

    const switchHandler = (event) => {
        setChecked(event.target.checked);
        console.log(event.target.checked)
    };



    const recoverPassword = (verification) => {
        if (verification){
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

    const handleSubmit = (event) => {
        event.preventDefault();

        doVerification2FA(credential);

        setOpen2FA(true)
        setOpenRestore(false)
    }


    return (
        <div className='all'>
            <RecoverPassword
                data={credential}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                /*messageStr={message}*/
                switchHandler={switchHandler}
            />
            <TwoFA open={open2FA} close={() => setOpen2FA(false)} dataToSend={credential} verifySignUp={recoverPassword}/>
            <RestorePassword open={openRestore} close={() => setOpenRestore(false)} credential={credential} check={checked}/>

        </div>
    )
}

export default RecoverPasswordPage;