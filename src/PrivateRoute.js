import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from './services/authService';

export default function PrivateRoute({ children }) {
  const token = getToken();

  return token ? children : <Navigate to="/login" />;
}
