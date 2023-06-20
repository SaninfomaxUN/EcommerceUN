import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoutesAdmin = () => {
  const token = Cookies.get('token');
  const role = Cookies.get('role');

  if (token && role === 'admin') {
    return <Outlet />;
  } else {
    return <Navigate to="/*" />;
  }
};

export default PrivateRoutesAdmin;
