import React, { useState } from "react";
import "./Styles/NavbarAdmin.css";
import Cookies from "js-cookie";

export default function NavbarAdmin() {

  const handleToggleClick = () => {
    const sidebar = document.querySelector("nav.sidebar");
    sidebar.classList.toggle("close");
  };

  const handleSearchBtnClick = () => {
    const sidebar = document.querySelector("nav.sidebar");
    sidebar.classList.remove("close");
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
                <a href="/ProductsAdmin">
                  <i className="bx bx-bell icon"></i>
                  <span className="text nav-text">Productos</span>
                </a>
              </li>


              <li className="nav-link">
                <a href="/SellerAdmin">
                <i className='bx bxs-user-circle icon'></i>
                  <span className="text nav-text">Admin Vendedores</span>
                </a>
              </li>


              <li className="nav-link">
                <a href="/ShopperAdmin">
                  <i className="bx bx-wallet icon"></i>
                  <span className="text nav-text">Admin compradores</span>
                </a>
              </li>

           

              <li className="">
              <a href="/" onClick={clearCookies} >
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Salir</span>
              </a>
            </li>
            </ul>
          </div>
        </div>
      </nav>
        </>
  )}