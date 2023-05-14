import React, {useRef, useState} from 'react';
import './Styles/2FA.css';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {Box} from "@mui/material";
import Stack from '@mui/material/Stack';
import {TextField} from '@mui/material';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function TwoFA(props) {
    const code2FAEntered = useRef('')
    const [isCode2FACorrect, setIsCode2FACorrect] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        sendToCheckVerification2FA(code2FAEntered.current.value);

    }
    const sendToCheckVerification2FA = (codeEntered) => {
        const codeDataToSend = {dataToSend: props.dataToSend, code: codeEntered}
        axios.post('http://localhost:5000/api/check2FA', codeDataToSend)
            .then(
                res => {
                    setIsCode2FACorrect(!res.data)
                    checkVerification2FA(res.data)

                }
            )
            .catch(err => console.log(err));
    };
    const checkVerification2FA= (verification) => {
        if(verification){
            props.verifySignUp(verification);
            navigate('/Login')
        }

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
                                <Box>Ingresa el Código de Verificación enviado al Correo:</Box>
                                <Box display="flex" justifyContent="center" alignItems="center" className="emailBox">{props.dataToSend.email}</Box>
                                <TextField error={isCode2FACorrect} id="codeField" label="Código de 6 dígitos" variant="outlined" helperText={isCode2FACorrect && "Código de Verificación incorrecto!"}
                                           inputProps={{maxLength: 6}}
                                           required={true}  inputRef={code2FAEntered}/>
                                <Button type="submit" variant="contained" size="large" color="secondary">
                                    Comprobar
                                </Button>
                            </Stack>
                        </form>

                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default TwoFA;

