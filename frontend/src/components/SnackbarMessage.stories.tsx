import React from 'react';
import { Story } from '@storybook/react';
import SnackbarMessage, { SnackbarMessageProps } from './SnackbarMessage';

const description = 'This is the description!';

export default {
  title: 'components/SnackbarMessage',
  component: SnackbarMessage,
};

const Template: Story<SnackbarMessageProps> = ({ ...args }) => (
  <SnackbarMessage {...args} />
);

export const WithSuccessSeverity = Template.bind({});
WithSuccessSeverity.args = {
  severity: 'success',
  description,
};

export const WithInfoSeverity = Template.bind({});
WithInfoSeverity.args = {
  severity: 'info',
  description,
};

export const WithWarningSeverity = Template.bind({});
WithWarningSeverity.args = {
  severity: 'warning',
  description,
};

export const WithErrorSeverity = Template.bind({});
WithErrorSeverity.args = {
  severity: 'error',
  description,
};

export const WithoutDescription = Template.bind({});
WithoutDescription.args = {
  severity: 'error',
};
