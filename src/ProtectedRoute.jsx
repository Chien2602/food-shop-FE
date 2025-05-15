import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const isAuthenticated = () => {
  const token = Cookies.get('token');
  return !!token;
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;