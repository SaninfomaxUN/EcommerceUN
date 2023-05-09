import React from 'react';
import './Styles/2FA.css';

import Button from '@mui/material/Button';
import {Container, FormGroup} from "@mui/material";
import {Box} from "@mui/material";
import Stack from '@mui/material/Stack';
import {TextField} from '@mui/material';
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";



function handleSubmit(e){
    e.preventDefault();
    console.log("SIUUU");
    Swal.fire(
        '¡Has sido verificado correctamente!',
        '',
        'success')
}

function TwoFA(props) {

    const navigate = useNavigate();

    return (
        <div className="TwoFAPage">
            <Container disableGutters={true} maxWidth={false} className="Container">
                <Box display="flex" justifyContent="center" alignItems="center" className="Box">
                    <Box display="flex" justifyContent="center" alignItems="center" className="BoxInside">

                        <form onSubmit={handleSubmit}  typeof='control' className='form2FA'>
                            <Stack spacing={2}>
                                <Box>Ingresa el Código de Verificación enviado al Correo:</Box>
                                <Box className="emailBox">{props.email}</Box>
                                <TextField id="codeField" label="Código de 6 dígitos" variant="outlined" inputProps={{ maxLength: 6 }}
                                           required={true}/>
                                <Button type="submit" variant="contained" size="large" color="secondary" >
                                    Comprobar
                                </Button>
                            </Stack>
                        </form>

                    </Box>
                </Box>
            </Container>

        </div>
    );
}

export default TwoFA;

