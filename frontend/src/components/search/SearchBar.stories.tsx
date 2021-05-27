import React from 'react';
import { Story } from '@storybook/react';
import { SearchBar, SearchBarProps } from './SearchBar';

export default {
  title: 'components/search/SearchBar',
  component: SearchBar,
  argTypes: { handleInputChange: { action: 'inputChanged' } },
};

const Template: Story<SearchBarProps> = ({ ...args }) => (
  <SearchBar {...args} />
);

export const InSearchView = Template.bind({});
InSearchView.args = {
  inSearchView: true,
};

export const NotInSearchView = Template.bind({});
NotInSearchView.args = {
  inSearchView: false,
};
