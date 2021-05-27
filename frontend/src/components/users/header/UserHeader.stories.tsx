import React from 'react';
import { Story } from '@storybook/react';
import { UserFactory } from 'factories/UserFactory';
import { UserHeader, UserHeaderProps } from './UserHeader';

const user = UserFactory.make();
const stats = {
  totalPost: 45,
};

export default {
  title: 'components/users/header/UserHeader',
  component: UserHeader,
};

const Template: Story<UserHeaderProps> = ({ ...args }) => (
  <UserHeader {...args} />
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
