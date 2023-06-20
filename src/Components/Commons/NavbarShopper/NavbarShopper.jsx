import React, { useState } from "react";
import "./Styles/NavbarShopper.css";

import Cookies from "js-cookie";

export default function NavbarShopper() {
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
   }


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
{/*            <li className="search-box" onClick={handleSearchBtnClick}>
              <i className="bx bx-search icon"></i>
              <input type="text" placeholder="Search..." />
            </li>*/}

            <ul className="menu-links">

              <li className="nav-link">
                <a href="/Home">
                  <i className="bx bx-home-alt icon"></i>
                  <span className="text nav-text">HomePage</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="/Profile">
                <i className='bx bxs-user-circle icon'></i>
                  <span className="text nav-text">Mi perfil</span>
                </a>
              </li>

              {/*<li className="nav-link">*/}
              {/*  <a href="/WishList">*/}
              {/*    <i className="bx bx-heart icon"></i>*/}
              {/*    <span className="text nav-text">Mis Favoritos</span>*/}
              {/*  </a>*/}
              {/*</li>*/}

              <li className="nav-link">
                <a href="/MyPurchases">
                  <i className="bx bx-bar-chart-alt-2 icon"></i>
                  <span className="text nav-text">Mis Compras</span>
                </a>
              </li>


              <li className="nav-link">
                <a href="/Addresses">
                  <i className="bx bx-bell icon"></i>
                  <span className="text nav-text">Mis Direcciones</span>
                </a>
              </li>


              <li className="nav-link">
                <a href="/PaymentMethods">
                  <i className="bx bx-wallet icon"></i>
                  <span className="text nav-text">Métodos de pago</span>
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