import React from 'react';
import { Switch, useHistory } from 'react-router-dom';
import { RouteWithSubRoutes } from 'router/RouteWithSubRoutes';
import { PrivateRoute } from 'router/PrivateRoute';
import { RouteProps } from 'router/RouterProps';
import { logPageView } from 'services/GAService';

export interface RouterProps {
  routes: RouteProps[];
}

export const Router: React.FC<RouterProps> = ({ routes }) => {
  const history = useHistory();

  history.listen((update: any) => {
    logPageView(update.pathname, update.search);
  });

  return (
    <Switch>
      {routes?.map((route: RouteProps) =>
        route.private ? (
          <PrivateRoute {...route} />
        ) : (
          <RouteWithSubRoutes key={route.path} {...route} />
        )
      )}
    </Switch>
  );
};
