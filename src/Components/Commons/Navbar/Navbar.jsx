import {NavLink, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import React from 'react';
import "../../../Pages/Login/Styles/Login.css";
// import logo from "../../../Pages/Login/Assets/logoProp.png";


export default function Navbar(props) {
    const [search, setSearch] = useState('');
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const navigate = useNavigate();
    const tosearch = () => {
        navigate("/Results", {state: {toString: search}})
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg  bg-body-tertiary ">
                <div className="container-fluid">
                    {/* <a className="navbar-brand"><img alt="" src={logo} width="40px" height="40px" /></a> */}
                    <a href='/' className="navbar-brand">EcommerceUN</a>
                    <div className="mb-2 mb-lg-0">
                        <form className="d-flex" role="search">
                            <input value={search}
                                   onChange={handleSearch}
                                   className="form-control me-2 barSearch"
                                   type="search"
                                   placeholder="Buscar un producto, marca etc..." aria-label="Search"/>
                            <button onClick={() => {
                                tosearch()
                            }} className="btn btn-outline-info" type="submit">Buscar
                            </button>
                        </form>
                    </div>
                    <div className='allbar'>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav navbar-nav {/*me-auto*/} mb-2 mb-lg-0">
                                {props.userConnected &&
                                <li className="nav-item">
                                    <NavLink className="navlink" to="/Home">Inicio</NavLink>
                                </li>}
                                <li className="nav-item">
                                    <NavLink className="navlink" to="/Login">Tú carrito</NavLink>
                                </li>
                                {props.userConnected &&
                                    <li className="nav-item cont-singup">
                                        <NavLink className="navlink  singup" to="/SignUp">Registrate</NavLink>
                                    </li>}
                                {props.userConnected &&
                                    <li className="nav-item">
                                        <NavLink className="navlink" to="/Login">Ingresar</NavLink>
                                    </li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
