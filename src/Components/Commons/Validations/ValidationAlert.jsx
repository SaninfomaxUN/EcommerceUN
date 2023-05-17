import React from 'react';
import {Alert, Snackbar} from "@mui/material";



function ValidationAlert(props){
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setOpenValidation(false);
    };

    return(
        <div>
            <Snackbar anchorOrigin={{vertical: "top", horizontal:"center"} } open={props.openValidation} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '150%' }}>
                    {props.messageValidation}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ValidationAlert;


