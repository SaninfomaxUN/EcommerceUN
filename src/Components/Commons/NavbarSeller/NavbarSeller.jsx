import React, { useState } from "react";
import "./Styles/NavbarSeller.css";
import Cookies from "js-cookie";

export default function NavbarSeller() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleClick = () => {
    const sidebar = document.querySelector("nav.sidebar");
    sidebar.classList.toggle("close");
  };

  const handleSearchBtnClick = () => {
    const sidebar = document.querySelector("nav.sidebar");
    sidebar.classList.remove("close");
  };

  const handleModeSwitchClick = () => {
    const body = document.querySelector("body");
    body.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  };

  
  const clearCookies = () => {
    Cookies.remove('token');
    Cookies.remove('role')
  }

  return (
    <>
      <nav className="sidebar close">
        <header>
          <i className="bx bx-chevron-right toggle" onClick={handleToggleClick}></i>
        </header>




        <div className="menu-bar">
          <div className="menu">
            {/*<li className="search-box" onClick={handleSearchBtnClick}>
              <i className="bx bx-search icon"></i>
              <input type="text" placeholder="Search..." />
            </li>*/}

            <ul className="menu-links">


            <li className="nav-link">
                <a href="/ProfileSeller">
                <i className='bx bxs-user-circle icon'></i>
                  <span className="text nav-text">Mi perfil</span>
                </a>
              </li>


              <li className="nav-link">
                <a href="/Home">
                  <i className="bx bx-home-alt icon"></i>
                  <span className="text nav-text">HomePage</span>
                </a>
              </li>



              {/*}
              <li className="nav-link">
                <a href="/Notification">
                  <i className="bx bx-bell icon"></i>
                  <span className="text nav-text">Notificaciones</span>
                </a>
              </li>*/}

              <li className="nav-link">
                <a href="/Sales">
                <i className='bx bx-money-withdraw bx-rotate-180 icon' ></i>
                  <span className="text nav-text">Ventas</span>
                </a>
              </li>
              

              <li className="nav-link">
                <a href="/Payments">
                  <i className="bx bx-wallet icon"></i>
                  <span className="text nav-text">Metódos de pago</span>
                </a>
              </li>


              <li className="">
              <a href="/" onClick={clearCookies} >
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li className="mode" onClick={handleModeSwitchClick}>
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">{isDarkMode ? "Modo claro" : "Modo oscuro"}</span>

              <div className="toggle-switch">
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>


        </>
  )}