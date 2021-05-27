import React from 'react';
import { Story } from '@storybook/react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import SearchList, { SearchListProps } from './SearchList';

export default {
  title: 'components/search/SearchList',
  component: SearchList,
};

const Template: Story<SearchListProps> = ({ ...args }) =>
  wrapInMemoryRouter(<SearchList {...args} />);

export const WithUsersTab = Template.bind({});
WithUsersTab.args = {
  tab: 0,
};

export const WithHashtagsTab = Template.bind({});
WithHashtagsTab.args = {
  tab: 1,
};

export const WithPostsTab = Template.bind({});
WithPostsTab.args = {
  tab: 2,
};
