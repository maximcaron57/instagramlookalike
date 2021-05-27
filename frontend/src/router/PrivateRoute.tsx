import React, { useContext } from 'react';
import { UserContext } from 'context/userContext';
import { RouteProps } from './RouterProps';
import { RouteWithSubRoutes } from './RouteWithSubRoutes';

export const PrivateRoute = (route: RouteProps) => {
  const { currentUser } = useContext(UserContext);

  const privateRoute = { ...route };
  if (route.private && !currentUser) {
    privateRoute.redirect = '/login';
  }

  return <RouteWithSubRoutes {...privateRoute} />;
};
