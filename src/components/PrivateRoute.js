import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if token exists in localStorage
  const token = localStorage.getItem('token');
  
  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/signin" />;
  }

  // If token exists, allow access to the route
  return children;
};

export default PrivateRoute;
