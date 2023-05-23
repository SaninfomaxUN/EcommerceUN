import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import axios from 'axios'

import TwoFA from "../../2FA/TwoFA";
import SignUpSeller from "./SignUpSeller";
import {doVerification2FA} from "../../2FA/TwoFAFunction";
import {showAlertError, showAlertInfo, showAlertSuccess} from "../../../Components/Commons/Alerts/AlertsModal";
import {passwordValidation} from "../../../Components/Commons/Validations/passwordValidations";
import ValidationAlert from "../../../Components/Commons/Validations/ValidationAlert";

let checkExisting = false
export const checkExistingSeller = (formData, nav) => {


    axios.post('http://localhost:5000/api/checkExistingSeller', formData)
        .then(() => {
            checkExisting = true
        })
        .catch(err => {
            console.log(err)
            showAlertInfo(err.response.data.message)
            nav('/Login')
    });
    return checkExisting

};

export const doSignUpSeller = (formData) => {

    axios.post('http://localhost:5000/api/serviceSignUpSeller', formData)
        .then(res => {
            console.log(res.data)
            showAlertSuccess("¡Has sido registrado correctamente!")
        }).catch(err => {
        console.log(err)
        showAlertError("No has sido registrado correctamente :(")
    });


};


const SignUpSellerPage = () => {
    const navigate = useNavigate();
    const [openValidation, setOpenValidation] = React.useState(false);
    const [messageValidation, setMessageValidation] = React.useState('');
    const [open2FA, setOpen2FA] = React.useState(false);


    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        nit: '',
        telefono: '',
        pais: '',
        rol: '',
        direccionPersonal: '',
        razonSocial: '',
        password: '',
        confirmPassword: "",
        fechaRegistro: new Date().toISOString().slice(0, 19).replace('T', ' ')
    });

    const verifySignUp = (verification) => {
        if (verification) {
            setOpen2FA(false)
            doSignUpSeller(formData)
            navigate('/Login')
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const [selectedCountry, setSelectedCountry] = useState("Colombia");

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        setFormData({
            ...formData,
            pais: event.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const [validation, message] = passwordValidation(formData.password, formData.confirmPassword, formData.email)
        setMessageValidation(message)
        setOpenValidation(!validation)
        if (!validation){
            return;
        }

        const check = checkExistingSeller(formData, navigate)
        if (check){
            doVerification2FA(formData);
            setOpen2FA(true)
        }

    };


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    return (
        <div className='all fullWidthBackground'>
            <div>
                {openValidation && <ValidationAlert openValidation={openValidation} setOpenValidation={setOpenValidation} messageValidation={messageValidation} />}
            </div>
            <SignUpSeller data={formData}
                          handleSubmit={handleSubmit}
                          handleChange={handleChange}
                          selectedCountry={selectedCountry}
                          handleCountryChange={handleCountryChange}
                          setShowPassword={setShowPassword}
                          showPassword={showPassword}
                          setShowConfirmPassword={setShowConfirmPassword}
                          showConfirmPassword={showConfirmPassword}
            />
            <TwoFA open={open2FA} close={() => setOpen2FA(false)} dataToSend={formData} verifySignUp={verifySignUp}/>
        </div>
    )
}
export default SignUpSellerPage