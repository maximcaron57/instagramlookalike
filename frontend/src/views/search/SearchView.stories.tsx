import React from 'react';
import { SearchView } from './SearchView';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';

export default {
  title: 'views/search/SearchView',
  component: SearchView,
};

export const Basic = () => wrapInMemoryRouter(<SearchView />);
