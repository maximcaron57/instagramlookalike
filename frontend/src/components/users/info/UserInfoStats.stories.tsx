import React from 'react';
import { Story } from '@storybook/react';
import { UserInfoStats, UserInfoStatsProps } from './UserInfoStats';

export default {
  title: 'components/users/info/UserInfoStats',
  component: UserInfoStats,
};

const Template: Story<UserInfoStatsProps> = ({ ...args }) => (
  <UserInfoStats {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  stats: {
    totalPost: 45,
  },
};
