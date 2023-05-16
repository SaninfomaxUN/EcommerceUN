import axios from "axios";
import {showAlertError, showAlertSuccess} from "../../../../Components/Commons/Alerts/AlertsModal";

export const doResetPassword = (credential, checked, navigate) => {
    let url = ""
    if (checked){
        url="http://localhost:5000/api/ResetPasswordSeller"
    }else{
        url="http://localhost:5000/api/ResetPasswordShopper"
    }
    axios.post(url, credential)
        .then(res => {
            console.log(res.data)
            showAlertSuccess("¡Ha sido actualizada correctamente!")
        }).catch(err => {
        console.log(err)
        showAlertError("No ha sido actualizada correctamente :(")
    });
    navigate("/Login")
};