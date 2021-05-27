import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner';
import Container from '@material-ui/core/Container';
import { RouteProps } from './RouterProps';

export const RouteWithSubRoutes = (route: RouteProps) => {
  const render = (props) =>
    route.redirect ? (
      <Redirect to={route.redirect} />
    ) : (
      route.component && <route.component {...props} routes={route.children} />
    );

  return (
    <Suspense
      fallback={
        <Container>
          <LoadingSpinner absolute />
        </Container>
      }
    >
      <Route path={route.path} render={render} />
    </Suspense>
  );
};
