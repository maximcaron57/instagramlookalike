import React from 'react';
import { Story } from '@storybook/react';
import {
  UserInfoStatsMobile,
  UserInfoStatsMobileProps,
} from './UserInfoStatsMobile';

export default {
  title: 'components/users/info/UserInfoStatsMobile',
  component: UserInfoStatsMobile,
};

const Template: Story<UserInfoStatsMobileProps> = ({ ...args }) => (
  <UserInfoStatsMobile {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  totalPost: 45,
};
