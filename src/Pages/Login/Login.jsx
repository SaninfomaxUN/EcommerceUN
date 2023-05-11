import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import cohete from './Assets/cohete.jpg'

const Login = () => {
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
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const responseData = await response.json()
      console.log(responseData)
      localStorage.setItem('token', responseData.token)



      // Redirigir al usuario a otra página
      Navigate('/DashShopper')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <div className='container-fluid containerLog'>
        <div className='card divcard'>
          <div className='row g-0'>
            <div>
              <div className='card-header'> Ingresa sesión</div>
              <div className='card-body'>
                <div className='divImg2'>
                  <img className='img-fluid rounded-start imgCohete' src={cohete} />
                </div>

                <div className='contInput1'>
                  <form onSubmit={handleSubmit} className='formUser'>
                    <label htmlFor='email' className=''>
                      Usuario
                    </label>
                    <input
                      id='email'
                      type='email'
                      name='email'
                      placeholder='acá va tú correo :D'
                      className='form-control input1'
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
                  </form>
                  <br />
                  <br />
                  ¿No tienes cuenta?,
                  <Link to='/SignUp' className='RecoverPassword'>
                    {' '}
                    registrate
                  </Link>
                </div>
                {/* <Google /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
