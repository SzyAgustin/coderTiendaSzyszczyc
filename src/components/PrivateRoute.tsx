import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

interface PrivateRouteProps {
  children: any;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useContext(UserContext);
  console.log(user)
  return !user ? <Navigate to='/signIn' /> : children;
};

export default PrivateRoute;
