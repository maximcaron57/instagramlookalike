import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'router/Router';
import { routes } from 'router/Config';
import { UserContext } from 'context/userContext';
import { HelmetProvider } from 'react-helmet-async';
import { HelmetHeader } from 'components/HelmetHeader';
import { ToastProvider } from 'react-toast-notifications';
import MainLayout from './layouts/MainLayout';
import { readUserFromCookie } from './util/cookie';
import { logPageView } from './services/GAService';

const App = () => {
  const [user, setUser] = useState(readUserFromCookie());

  useEffect(() => {
    logPageView(window.location.pathname, window.location.search);
  });

  return (
    <UserContext.Provider
      value={{ currentUser: user, setUser: (usr) => setUser(usr) }}
    >
      <HelmetProvider>
        <HelmetHeader title="UGRAM" />
        <ToastProvider placement="top-center">
          <BrowserRouter>
            <MainLayout>
              <Router routes={routes} />
            </MainLayout>
          </BrowserRouter>
        </ToastProvider>
      </HelmetProvider>
    </UserContext.Provider>
  );
};

export default App;
