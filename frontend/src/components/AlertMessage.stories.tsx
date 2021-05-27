import React from 'react';
import { Story } from '@storybook/react';
import AlertMessage, { AlertMessageProps } from './AlertMessage';

const title = 'This is the title!';
const description = 'This is the description!';

export default {
  title: 'components/AlertMessage',
  component: AlertMessage,
};

const Template: Story<AlertMessageProps> = ({ ...args }) => (
  <AlertMessage {...args} />
);

export const WithSuccessSeverity = Template.bind({});
WithSuccessSeverity.args = {
  severity: 'success',
  title,
  description,
};

export const WithInfoSeverity = Template.bind({});
WithInfoSeverity.args = {
  severity: 'info',
  title,
  description,
};

export const WithWarningSeverity = Template.bind({});
WithWarningSeverity.args = {
  severity: 'warning',
  title,
  description,
};

export const WithErrorSeverity = Template.bind({});
WithErrorSeverity.args = {
  severity: 'error',
  title,
  description,
};

export const WithoutDescription = Template.bind({});
WithoutDescription.args = {
  severity: 'error',
  title,
};
