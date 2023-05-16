import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoutesShopper = () => {
  const token = Cookies.get('token');
  const role = Cookies.get('role');

  if (token && role === 'comprador') {
    return <Outlet />;
  } else {
    return <Navigate to="/*" />;
  }
};

export default PrivateRoutesShopper;
