import React from 'react';
import { Story } from '@storybook/react';
import { UserFactory } from 'factories/UserFactory';
import { UserInfoHeader, UserInfoHeaderProps } from './UserInfoHeader';

const user = UserFactory.make();

export default {
  title: 'components/users/info/UserInfoHeader',
  component: UserInfoHeader,
};

const Template: Story<UserInfoHeaderProps> = ({ ...args }) => (
  <UserInfoHeader {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  username: user.username,
};
