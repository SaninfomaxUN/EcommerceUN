import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Styles/SignUp.css"
import comprador from "./Assets/comprador.jpg"
import vendedor from "./Assets/vendedor.jpg"



const SignUp = () => {
  return (
 
        <div className='container-fluid containerLog'>
          <br />
          <br />
          <br />
        <div className='card divcard'>
        <div className='card-header'> Escoge tú opción de registro</div>
        <div className='row g-0'>

        <div className='card-body'>
        <div className='complete'>
        
        <div className='comprador'>
          <img className="img-fluid rounded-start imgComprador" src={comprador}  />
          <NavLink to="/SignUpShopper">
           <button className='btn buttonComprador'> Registro para compradores</button>
          </NavLink >
        </div>


        <div className='vendedor'>
          <img className="img-fluid rounded-start imgVendedor" src={vendedor}  />
          <NavLink to="/SignUpSeller">
        <button className='btn buttonVendedor'> Registro para Vendedores</button>
        </NavLink>
        <br />
        <br />
        <br />
        </div>

        </div>
        </div>
        </div>
    </div>
    
    </div>
   
    
  )
}

export default SignUp