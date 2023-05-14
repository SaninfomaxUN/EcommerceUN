import React, {useState} from 'react'
import axios from 'axios'
import TwoFA from "../../2FA/TwoFA";
import SignUpSeller from "./SignUpSeller";
import {doVerification2FA} from "../../2FA/TwoFAFunction";
import {showAlertError, showAlertSuccess} from "../../../Components/Commons/Alerts/AlertsModal";


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



const SignUpSellerPage = (value, onChange) => {
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

    const verifySignUp = (verification) =>{
        if(verification){
            setOpen2FA(false)
            doSignUpSeller(formData)
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

        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        if (formData.password.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        if (!/[A-Z]/.test(formData.password)) {
            alert("La contraseña debe contener al menos una letra mayúscula");
            return;
        }

        if (!/[a-z]/.test(formData.password)) {
            alert("La contraseña debe contener al menos una letra minúscula");
            return;
        }

        if (!/\d/.test(formData.password)) {
            alert("La contraseña debe contener al menos un número");
            return;
        }

        if (formData.password === formData.email) {
            alert("La contraseña no puede ser igual al correo electrónico del usuario");
            return;
        }

        doVerification2FA(formData);
        setOpen2FA(true)

    };



    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    return (
        <div className='all'>
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
            <TwoFA open={open2FA} close={() => setOpen2FA(false)} email={formData.email} verifySignUp={verifySignUp}/>
        </div>
    )
}
export default SignUpSellerPage