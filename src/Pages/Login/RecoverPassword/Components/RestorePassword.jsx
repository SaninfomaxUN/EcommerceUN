import React, {useRef, useState} from 'react';
import './Styles/2FA.css';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {Box} from "@mui/material";
import Stack from '@mui/material/Stack';
import {TextField} from '@mui/material';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {doResetPassword} from "./RestorePasswordFunction";

function RestorePassword(props) {
    const newPassword = useRef('')
    const newPasswordAgain = useRef('')
    const [isCode2FACorrect, setIsCode2FACorrect] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        let credential = props.credential
        credential.newPassword= newPassword.current.value;

        doResetPassword(props.credential, props.check, navigate);

    }

    return (
        <div className="TwoFAPage">
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
                                <Box>Ingresa tu nueva contraseña:</Box>
                                <Box display="flex" justifyContent="center" alignItems="center" className="emailBox">{props.credential.email}</Box>
                                <TextField error={isCode2FACorrect} id="newPasswordField" label="Código de 6 dígitos" variant="outlined" helperText={isCode2FACorrect && "Las constraseñas no coinciden!"}
                                           inputProps={{minLength: 8}}
                                           required={true}  inputRef={newPassword}/>
                                <TextField error={isCode2FACorrect} id="newPasswordFieldAgain" label="Código de 6 dígitos" variant="outlined" helperText={isCode2FACorrect && "Las constraseñas no coinciden!"}
                                           inputProps={{minLength: 8}}
                                           required={true}  inputRef={newPasswordAgain}/>
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

