/* eslint-disable prefer-const */
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { routes } from 'routes/routes';

export function ProtectedRoute({
   children,
   path = routes().welcome,
}: {
   children: JSX.Element;
   path?: string;
}) {
   let location = useLocation();
   const userToken = localStorage.getItem('accessToken');

   if (!userToken) {
      return <Navigate to={path} state={{ from: location }} />;
   }
   return children;
}
