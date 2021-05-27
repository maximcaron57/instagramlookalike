import { lazy } from 'react';
import { RouteProps } from './RouterProps';

export const ROUTE_PATHS = {
  home: '/',
  login: '/login',
  feed: (params?) => (params ? `/posts?${params}` : '/posts'),
  post: (postId?) => `/posts/${postId}`,
  user: (username?) => `/users/${username}`,
  settings: '/settings',
  search: (params?) => (params ? `/search?${params}` : '/search'),
};

export const routes: RouteProps[] = [
  {
    key: 'root',
    path: ROUTE_PATHS.home,
    exact: true,
    redirect: '/posts',
    private: true,
  },
  {
    key: 'login',
    path: ROUTE_PATHS.login,
    component: lazy(() => import('views/auth/LoginView')),
    exact: true,
    private: false,
  },
  {
    key: 'feed',
    path: ROUTE_PATHS.feed(),
    component: lazy(() => import('views/posts/FeedView')),
    exact: true,
    private: true,
  },
  {
    key: 'post',
    path: ROUTE_PATHS.post(':postId'),
    component: lazy(() => import('views/posts/PostView')),
    exact: true,
    private: true,
  },
  {
    key: 'user',
    path: ROUTE_PATHS.user(':username'),
    component: lazy(() => import('views/users/UserView')),
    exact: true,
    private: true,
  },
  {
    key: 'settings',
    path: ROUTE_PATHS.settings,
    component: lazy(() => import('views/settings/SettingsView')),
    exact: true,
    private: true,
  },
  {
    key: 'search',
    path: ROUTE_PATHS.search(),
    component: lazy(() => import('views/search/SearchView')),
    exact: true,
    private: true,
  },
];
