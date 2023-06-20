import {Alert, Snackbar} from "@mui/material";
import React from "react";

function ValidationAlertStatic(props){

    return(
        <div>
            <Snackbar anchorOrigin={{vertical: "bottom", horizontal:"center"} } open={props.openValidation}>
                <Alert  severity={props.severity} sx={{ width: '100%' }}>
                    {props.messageValidation}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ValidationAlertStatic;