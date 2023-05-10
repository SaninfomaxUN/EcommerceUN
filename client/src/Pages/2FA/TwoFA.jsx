import React, {useRef} from 'react';
import './Styles/2FA.css';

import Button from '@mui/material/Button';
import {Container, Typography} from "@mui/material";
import Modal from '@mui/material/Modal';
import {Box} from "@mui/material";
import Stack from '@mui/material/Stack';
import {TextField} from '@mui/material';

function TwoFA(props) {
    const code2FAEntered = useRef('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(code2FAEntered.current.value);
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
                                <Box display="flex" justifyContent="center" alignItems="center" className="emailBox">{props.email}</Box>
                                <TextField id="codeField" label="Código de 6 dígitos" variant="outlined"
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

