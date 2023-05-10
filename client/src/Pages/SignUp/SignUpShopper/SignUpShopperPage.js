import React, {useState} from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'
import TwoFA from "../../2FA/TwoFA";
import SignUpShopper from "./SignUpShopper"


export const doSignUpShopper = (formData) => {

    axios.post('http://localhost:5000/api/serviceSignUpShopper', formData)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

    Swal.fire(
        '¡Has sido registrado correctamente!',
        '',
        'success')


};

export const doVerification2FA = (formData, setOpen) => {
    setOpen(true);
    axios.post('http://localhost:5000/api/sendTwoFA', formData)
        .then(res => {return res})
        .catch(err => console.log(err));

};

const SignUpShopperPage = () => {
    //const navigate = useNavigate();
    const [open2FA, setOpen] = React.useState(false);


    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        pais: '',
        rol: '',
        password: '',
        confirmPassword: '',
        fechaRegistro: new Date().toISOString().slice(0, 19).replace('T', ' ')
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const [selectedCountry, setSelectedCountry] = useState("");

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
        //navigate("/2FA_Verification", { state: { emailToVerify: formData.email }})
        const code = doVerification2FA(formData, setOpen);
        console.log(code)
        //doSignUpShopper(formData)
    };


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    return (
        <div className='all'>
            <SignUpShopper data={formData}
                           handleSubmit={handleSubmit}
                           handleChange={handleChange}
                           selectedCountry={selectedCountry}
                           handleCountryChange={handleCountryChange}
                           setShowPassword={setShowPassword}
                           showPassword={showPassword}
                           showConfirmPassword={showConfirmPassword}
                           setShowConfirmPassword={setShowConfirmPassword}
            />
            <TwoFA open={open2FA} close={() => setOpen(false)} email={formData.email}/>
        </div>
    )
}
export default SignUpShopperPage