import React from 'react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostView } from './PostView';

export default {
  title: 'views/posts/PostView',
  component: PostView,
};

export const Basic = () => wrapInMemoryRouter(<PostView />);
