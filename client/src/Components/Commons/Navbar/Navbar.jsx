import { NavLink } from 'react-router-dom';
import React from 'react';
import "../../../Pages/Login/Styles/Login.css";
import logo from "../../../Pages/Login/Assets/logoProp.png";

export default function Navbar({ search, searcher, porfin }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg  bg-body-tertiary ">
        <div className="container-fluid">
          {/* <a className="navbar-brand"><img alt="" src={logo} width="40px" height="40px" /></a> */}
          <a className="navbar-brand">Tú pedido</a>
          <div className='allbar'>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav navbar-nav me-auto mb-2 mb-lg-0">
                <form className="d-flex" role="search">
                  <input value={search}
                    onChange={searcher}
                    className="form-control me-2 barSearch"
                    type="search"
                    placeholder="Buscar un producto, marca etc..." aria-label="Search" />
                  <button onClick={porfin} className="btn btn-outline-info" type="submit">Buscar</button>
                </form>
                <li className="nav-item">
                  <NavLink className="navlink" to="/Home">Inicio</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="navlink" to="/Login">tú carrito</NavLink>
                </li>
                <li className="nav-item cont-singup">
                  <NavLink className="navlink  singup" to="/SignUp">Registrate</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="navlink" to="/Login">Ingresar</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
