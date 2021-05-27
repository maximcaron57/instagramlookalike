import React from 'react';
import { Story } from '@storybook/react';
import { UserFactory } from 'factories/UserFactory';
import {
  UserInfoDescription,
  UserInfoDescriptionProps,
} from './UserInfoDescription';

const user = UserFactory.make();

export default {
  title: 'components/users/info/UserInfoDescription',
  component: UserInfoDescription,
};

const Template: Story<UserInfoDescriptionProps> = ({ ...args }) => (
  <UserInfoDescription {...args} />
);

export const WithDescription = Template.bind({});
WithDescription.args = {
  fullname: user.firstName,
  description: user.description,
};

export const WithoutDescription = Template.bind({});
WithoutDescription.args = {
  fullname: user.firstName,
};
