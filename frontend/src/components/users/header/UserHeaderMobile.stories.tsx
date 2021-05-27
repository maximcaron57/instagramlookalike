import React from 'react';
import { Story } from '@storybook/react';
import { UserFactory } from 'factories/UserFactory';
import { UserHeaderMobile, UserHeaderMobileProps } from './UserHeaderMobile';

const user = UserFactory.make();
const stats = {
  totalPost: 45,
};

export default {
  title: 'components/users/header/UserHeaderMobile',
  component: UserHeaderMobile,
};

const Template: Story<UserHeaderMobileProps> = ({ ...args }) => (
  <UserHeaderMobile {...args} />
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
