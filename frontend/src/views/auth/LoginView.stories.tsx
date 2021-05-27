import React from 'react';
import { Story } from '@storybook/react';
import LoginView from './LoginView';

export default {
  title: 'views/auth/LoginView',
  component: LoginView,
};

const Template: Story = ({ ...args }) => <LoginView {...args} />;

export const DefaultLoginView = Template.bind({});
