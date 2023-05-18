import React, {useRef, useState} from 'react';
import './Styles/2FA.css';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {Box} from "@mui/material";
import Stack from '@mui/material/Stack';
import {TextField} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {doResetPassword} from "./RestorePasswordFunction";
import ValidationAlert from "../../../../Components/Commons/Validations/ValidationAlert";
import {passwordValidation} from "../../../../Components/Commons/Validations/passwordValidations";

function RestorePassword(props) {
    const newPassword = useRef('')
    const newPasswordAgain = useRef('')

    const [arePasswordsIncorrect, setArePasswordsIncorrect] = useState(false);
    const [openValidation, setOpenValidation] = React.useState(false);
    const [messageValidation, setMessageValidation] = React.useState('');

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newPassword + "___" + newPasswordAgain);

        const [validation, message] = passwordValidation(newPassword.current.value, newPasswordAgain.current.value, props.credential.email)
        setMessageValidation(message)
        setOpenValidation(!validation)
        if (!validation){
            setArePasswordsIncorrect(!validation)
            return;
        }

        let credential = props.credential
        credential.newPassword= newPassword.current.value;

        doResetPassword(props.credential, props.check, navigate);

    }

    return (
        <div className="TwoFAPage">
            <div>
                {openValidation && <ValidationAlert openValidation={openValidation} setOpenValidation={setOpenValidation} messageValidation={messageValidation} />}
            </div>
            <Modal
                open={props.open}
                onClose={props.close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <Box display="flex" justifyContent="center" alignItems="center" className="BoxInside">

                        <form onSubmit={handleSubmit} typeof='control' className='form2FA'>
                            <Stack spacing={2}>
                                <Box>Ingresa tu nueva contraseña para:</Box>
                                <Box display="flex" justifyContent="center" alignItems="center" className="emailBox">{props.credential.email}</Box>
                                <TextField error={arePasswordsIncorrect} id="newPasswordField" type='password' label="Contraseña" variant="outlined"
                                           inputProps={{minLength: 8}}
                                           required={true} inputRef={newPassword}/>
                                <TextField error={arePasswordsIncorrect} id="newPasswordFieldAgain" type='password' label="Confirmar Contraseña" variant="outlined"
                                           inputProps={{minLength: 8}}
                                           required={true} inputRef={newPasswordAgain}/>
                                <Button type="submit" variant="contained" size="large" color="secondary">
                                    Guardar
                                </Button>
                            </Stack>
                        </form>

                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default RestorePassword;

