import React from 'react';
import { Story } from '@storybook/react';
import { UserFactory } from 'factories/UserFactory';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { Navigation, NavigationProps } from './Navigation';

export default {
  title: 'components/Navigation',
  component: Navigation,
};

const Template: Story<NavigationProps> = ({ ...args }) =>
  wrapInMemoryRouter(<Navigation {...args} />);

export const WithLoggedUser = Template.bind({});
WithLoggedUser.args = {
  loggedUser: UserFactory.make(),
};

export const WithoutLoggedUser = Template.bind({});
WithoutLoggedUser.args = {
  loggedUser: null,
};
