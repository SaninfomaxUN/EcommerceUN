import React, { useState } from 'react';
import axios from 'axios';
import "../Styles/RecoverPassword.css"
import img31 from "../Assets/Passforget.jpg"


function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/forgot-password', { email })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage(error.response.data.message);
      });
  }

  return (
   
  
<div className=' allContainer'>
<br/>
<br/>
  <div className='card container cardPassforget'>
  
  <div className='card-header'> Recupera tú contraseña</div>
  <br />
      <form onSubmit={handleSubmit}>
      <img src={img31} alt="" width={300} height={300} />
      <br />
      <br />
      <label className='labelPassforget'>
      Ingresa tú correo para recuperar tú contraseña
      </label>
      <br />
     <div className='form_group'>
      <input  className='inputPassforget' placeholder="Email " type="email" value={email} onChange={handleEmailChange} />
      {/* <label className='form_label'>Email</label> */}
      <span className='form_line'></span>
      <br />
      <br />
      </div>
      <button type="submit" className='buttonForget'>Enviar</button>
      </form>
      {message && <p>{message}</p>}
      <br />
     
    </div>
    <br />
      <br />
      <br />
    </div>
  );
}

export default RecoverPassword;