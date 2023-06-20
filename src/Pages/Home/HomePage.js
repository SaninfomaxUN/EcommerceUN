import React from 'react'
import Home from "./Home";
import Cookies from "js-cookie";


const HomePage = () => {
  const token = Cookies.get('token');
  const role = Cookies.get('role');
  let shopperConnected = false
  let sellerConnected = false
  let adminConnected = false
  if (token && role === 'comprador') {
    shopperConnected=true
  }else if (token && role === 'vendedor') {
    sellerConnected=true
  }else if (token && role === 'admin') {
    adminConnected=true
}
  return (
    <>
    <Home shopperConnected={shopperConnected} sellerConnected={sellerConnected} adminConnected={adminConnected}    />
    </>
  )
}

export default HomePage