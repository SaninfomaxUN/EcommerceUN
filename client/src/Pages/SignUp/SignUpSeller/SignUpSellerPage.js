import React, {useState} from 'react'
import axios from 'axios'
import "./Styles/SignUpSeller.css"
import countries from "../Data/countries";
import Swal from 'sweetalert2'



const SignUpSellerPage = (value, onChange) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    nit:'',   
    telefono: '',
    pais:'',
    rol:'',
    direccionPersonal:'',
    razonSocial:'',
    password: '',
    confirmPassword: "",
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
  
    axios.post('http://localhost:5000/api/serviceSignUpSeller', formData)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
      
    Swal.fire(
      '¡Has sido registrado correctamente!',
      '',
      'success')
  };
  




 







  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  




  return (
  <div className='all'>
    <div className='container-fluid containerRegi'>
      <div className='card divCard'>
      <div className='row g-0'>
      <div className='card-header '> Registrate</div>
      <div className='contInput1'>
          <form onSubmit={handleSubmit} action="" typeof='control' className='formUser'>
            <br/>            
          <label  className=''>Nombre</label>
          <input  placeholder='Nombre'  className='form-control input1'
          required 
          type="text" name="nombre" value={formData.nombre} onChange={handleChange}
          />

          <label className=''>Apellido</label>
          <input 
          type="text" 
          placeholder='acá va tú apellido'  
          className='form-control input1'   
          name="apellido" value={formData.apellido} onChange={handleChange}
          />

          <label htmlFor="" className=''>email</label>
          <input  
          type="email" 
          placeholder='acá va tú correo'  
          className='form-control input1'
          required   
          name="email" value={formData.email} onChange={handleChange} 
          />

          <label className=''>NiT o número de cedúla</label>
          <input 
          type="text" 
          placeholder='Nit o número de cedula'  
          className='form-control input1'
          name="nit" value={formData.nit} onChange={handleChange}          
          />
        

          <label htmlFor="" className=''>Número de celular</label>
          <input  
          placeholder='Ingresa tú número de celular'  
          className='form-control input1'
          required   
          type="tel" name="telefono" value={formData.telefono} onChange={handleChange}
          />

<label htmlFor="" className=''>Selecciona tu país: </label>
<br/>
<select value={selectedCountry} onChange={handleCountryChange}>
  
  {countries.map((country) => (
    <option key={country.code} value={country.code}>
      {country.name}
    </option>
  ))}
  
</select>
      <br/>
      <label className=''>Dirección</label>
      <input 
      type="text" 
      placeholder='Dirección '  
      className='form-control input1'
      name="direccionPersonal" value={formData.direccionPersonal} onChange={handleChange}          
      />     


      <label className=''>Razón Social</label>
      <input 
      type="text" 
      placeholder='Razón Social'  
      className='form-control input1'
      name="razonSocial" value={formData.razonSocial} onChange={handleChange}          
      />
<div className="password-input-wrapper">
<label htmlFor="passwordInput" className=''>Contraseña</label>
<a
    type="button"
    className="btn btn-outline-secondary password-toggle btnOjito"
    onClick={() => setShowPassword(!showPassword)}
    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
  >
    {showPassword ? (
      <i className="fas fa-eye-slash"><span className="material-symbols-outlined ojito">
      visibility
      </span></i>
    ) : (
      <i className="fas fa-eye"><span className="material-symbols-outlined ojito">
      visibility_off
      </span></i>
    )}
</a>


  <input
    id="passwordInput"
    type={showPassword ? "text" : "password"}
    placeholder='acá va tú contraseña'
    className='form-control input1'
    required
    name="password"
    value={formData.password}
    onChange={handleChange}
  />

</div>

<div className="password-input-wrapper">
<label htmlFor="" className='' required>Confirmar contraseña</label>
<a
    type="button"
    className="btn btn-outline-secondary password-toggle btnOjito "
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
  >
    {showConfirmPassword ? (
      <i className="fas fa-eye-slash ojito
      "><span className="material-symbols-outlined ojito">
      visibility
      </span></i>
    ) : (
      <i className="fas fa-eye ojito"><span className="material-symbols-outlined  ojito">
      visibility_off
      </span></i>
    )}
</a>
  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder='Confirma tú contraseña'
    className='form-control input1'
    required
    name="confirmPassword"
    value={formData.confirmPassword}
    onChange={handleChange}
  />

</div>
    <br/>
    <button  className="btn submitButton " type="submit">Registrarse</button>
    <br/>
    <br/>
    <br/>
    </form>
    </div>
    </div>
  </div>
  </div>
</div>
  )
}
export default SignUpSellerPage