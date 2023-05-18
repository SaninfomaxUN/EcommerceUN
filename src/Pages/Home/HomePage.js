import React from 'react'
import Home from "./Home";
import Cookies from "js-cookie";
import {Outlet} from "react-router-dom";


const HomePage = () => {
  const token = Cookies.get('token');
  const role = Cookies.get('role');
  let shopperConnected = false
  let sellerConnected = false
  if (token && role === 'comprador') {
    shopperConnected=true
  }else if (token && role === 'vendedor') {
    sellerConnected=true
  }
  return (
    <>
    <Home shopperConnected={shopperConnected} sellerConnected={sellerConnected}/>
    </>
  )
}

export default HomePage