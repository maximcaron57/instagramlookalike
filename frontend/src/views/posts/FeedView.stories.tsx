import React from 'react';
import { FeedView } from './FeedView';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';

export default {
  title: 'views/posts/FeedView',
  component: FeedView,
};

export const Basic = () => wrapInMemoryRouter(<FeedView />);
