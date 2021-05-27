import React from 'react';
import { UserView } from './UserView';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';

export default {
  title: 'views/users/UserView',
  component: UserView,
};

export const Basic = () => wrapInMemoryRouter(<UserView />);
