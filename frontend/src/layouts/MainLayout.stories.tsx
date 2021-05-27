import React from 'react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { FeedView } from 'views/posts/FeedView';
import { PostView } from 'views/posts/PostView';
import { UserView } from 'views/users/UserView';
import { SearchView } from 'views/search/SearchView';
import { MainLayout } from './MainLayout';

export default {
  title: 'layouts/MainLayout',
  component: MainLayout,
};

export const Basic = () =>
  wrapInMemoryRouter(
    <MainLayout>
      <></>
    </MainLayout>
  );

export const WithFeedView = () =>
  wrapInMemoryRouter(
    <MainLayout>
      <FeedView />
    </MainLayout>
  );

export const WithPostView = () =>
  wrapInMemoryRouter(
    <MainLayout>
      <PostView />
    </MainLayout>
  );

export const WithUserView = () =>
  wrapInMemoryRouter(
    <MainLayout>
      <UserView />
    </MainLayout>
  );

export const WithSearchView = () =>
  wrapInMemoryRouter(
    <MainLayout>
      <SearchView />
    </MainLayout>
  );
