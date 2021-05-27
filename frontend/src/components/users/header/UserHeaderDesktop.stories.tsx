import React from 'react';
import { Story } from '@storybook/react';
import { UserFactory } from 'factories/UserFactory';
import { UserHeaderDesktop, UserHeaderDesktopProps } from './UserHeaderDesktop';

const user = UserFactory.make();
const stats = {
  totalPost: 45,
};

export default {
  title: 'components/users/header/UserHeaderDesktop',
  component: UserHeaderDesktop,
};

const Template: Story<UserHeaderDesktopProps> = ({ ...args }) => (
  <UserHeaderDesktop {...args} />
);

export const WithoutAvatar = Template.bind({});
WithoutAvatar.args = {
  username: user.username,
  fullname: user.firstName,
  description: user.description,
  stats,
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  username: user.username,
  fullname: user.firstName,
  description: user.description,
  avatarSrc: user.avatarReference,
  stats,
};
