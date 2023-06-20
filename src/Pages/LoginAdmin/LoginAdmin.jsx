import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import cohete from './Assets/cohete.jpg'
import Cookies from 'js-cookie';
import axios from 'axios';
import {showAlertError} from "../../Components/Commons/Alerts/AlertsModal";


const LoginAdmin = () => {
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
    try {
      let endpoint;
      endpoint = process.env.REACT_APP_API +'/loginAdmin';
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const responseData = await response.json();
      console.log(responseData);
  
      Cookies.set('token', responseData.token);
      Cookies.set('role', responseData.userType);
      Cookies.set('id', responseData.id)
      userAuthenticated();
    } catch (error) {
      setError(error.message);
    }
  };

const userAuthenticated = async () => {
  try {
    const response = await axios.post(process.env.REACT_APP_API +"/isUserAuth", {}, {
      headers: {
        authorization: Cookies.get("token")
      }
    });
    console.log(response);
    Navigate('/ShopperAdmin');

  } catch (error) {
    console.error(error);
  
    showAlertError("Correo y/o contraseña incorrectas :(");
  }
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
                    <br />
                    <button type='submit' className='btn btnLogin'>
                      Ingresa
                    </button>
                    
                  </form>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginAdmin
