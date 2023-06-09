import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import cohete from './Assets/cohete.jpg'
import Cookies from 'js-cookie';
import axios from 'axios';
import { Switch, FormControlLabel } from '@mui/material';
import {showAlertError,showAlertInfo} from "../../Components/Commons/Alerts/AlertsModal";
import Swal from 'sweetalert2';

const Login = () => {
    const Navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = null
    try {
      let endpoint;
  
      if (isSeller) {
        endpoint = process.env.REACT_APP_API +'/loginSeller';
      } else {
        endpoint = process.env.REACT_APP_API +'/loginShopper';
      }
  

    await axios.post(endpoint,{email:email, password:password })
   .then(res =>{
   response = res.data
        }).catch( err =>{
           console.log("este es el error completo",err)
           console.log("la data del error",err.response.data.type)
           let data = err.response.data

   					if(data.type === "suspended"){
   					  Swal.fire({
   					    title: 'Cuenta suspendida',
   					    text: 'Tu cuenta ha sido suspendida. Comunicate al correo: ecommerceunal@gmail.com',
   					    icon: 'info',
   				});
   		return
    }
 }) 


      const responseData = response;
      console.log("ultimo",responseData.id);
  
      Cookies.set('token', responseData.token);
      Cookies.set('role', responseData.userType);
      Cookies.set('id', responseData.id)
      userAuthenticated();
    } catch (error) {
      setError(error.message);
    }
  };


  
const userAuthenticated = async () => {
  
    let response  
		await axios.post(process.env.REACT_APP_API +"/isUserAuth", {}, {
      headers: {
        authorization: Cookies.get("token")
      }
    }).then(res=>{
      console.log("la respuesta",response);
      Navigate('/Home');

    }).catch(err=>{
      console.error(err);
      showAlertError("Correo y/o contraseña incorrectas :(");
    })
   
 
};

//  
//  
//  
//  
//  




const [isSeller, setIsSeller] = useState(false);
const handleSwitch = () => {
  setIsSeller(!isSeller);
};

  return (
    <div  className="fullWidthBackground">
     
      <div className='container-fluid containerLog'>
      <br />
      <br />
      <br />
        <div className='card divcard'>
          <div className='row g-0'>
            <div>
              <div className='card-header'> Ingresa sesión</div>
              <div className='card-body'>
                <div className='divImg2'>
                  <img alt={""} className='img-fluid rounded-start imgCohete' src={cohete} />
                </div>

                <div className='contInput1'>
                  <form onSubmit={handleSubmit}  className='formUser'>
                    <label htmlFor='email' className=''>
                      Usuario
                    </label>
                    <input
                      id='email'
                      type='email'
                      name='email'
                      placeholder='acá va tú correo :D'
                      className='form-control  input2'
                      aria-label='email'
                      required
                      value={email}
                      autoComplete="email"
                      onChange={handleEmailChange}
                    />
                    <br />
                    <label htmlFor='password' className='contraLabel'>
                      Contraseña
                    </label>
                    <input
                      value={password}
                      id='password'
                      type='password'
                      placeholder='Ingresa tú constraseña'
                      className='form-control input2'
                      aria-describedby='trash-desc'
                      name='password'
                      required
                      autoComplete="current-password"
                      onChange={handlePasswordChange}
                    />
                    <a href='/RecoverPassword' className='RecoverPassword'>
                      ¿Has olvidado tú contraseña?
                    </a>
                    <br />
                    <button type='submit' className='btn btnLogin'>
                      Ingresa
                    </button>
                    <br />

                    <FormControlLabel
                       control={
                         <Switch checked={isSeller} onChange={handleSwitch} color="primary" />
                       }
                       label={isSeller ? 'Soy Vendedor' : 'Soy Comprador'}
                     />
                  </form>


                  <br />
                  <br />
                  ¿No tienes cuenta?,
                  <Link to='/SignUp' className='RecoverPassword'>
                    registrate
                  </Link>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
