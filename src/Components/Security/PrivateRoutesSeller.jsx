import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoutesSeller = () => {
  const token = Cookies.get('token');
  const role = Cookies.get('role');

  if (token && role === 'vendedor') {
    return <Outlet />;
  } else {
    return <Navigate to="/*" />;
  }
};

export default PrivateRoutesSeller;
