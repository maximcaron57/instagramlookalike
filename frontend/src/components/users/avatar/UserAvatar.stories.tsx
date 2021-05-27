import React from 'react';
import { Story } from '@storybook/react';
import { UserFactory } from 'factories/UserFactory';
import { UserAvatar, UserAvatarProps } from './UserAvatar';

const user = UserFactory.make();

export default {
  title: 'components/users/avatar/UserAvatar',
  component: UserAvatar,
};

const Template: Story<UserAvatarProps> = ({ ...args }) => (
  <UserAvatar {...args} />
);

export const WithoutAvatar = Template.bind({});
WithoutAvatar.args = {
  username: user.username,
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  username: user.username,
  src: user.avatarReference,
};
