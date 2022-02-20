import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

interface PrivateRouteProps {
  children: any;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useContext(UserContext);
  return !user ? <Navigate to='/signIn' /> : children;
};

export default PrivateRoute;
