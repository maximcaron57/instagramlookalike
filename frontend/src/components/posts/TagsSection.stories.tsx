import React from 'react';
import { Story } from '@storybook/react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import TagsSection, { TagsSectionProps } from './TagsSection';

const post = PostFactory.make();

export default {
  title: 'components/posts/TagsSection',
  component: TagsSection,
};

const Template: Story<TagsSectionProps> = ({ ...args }) =>
  wrapInMemoryRouter(<TagsSection {...args} />);

export const WithUsertags = Template.bind({});
WithUsertags.args = {
  tags: post.usertags,
};

export const WithoutUsertag = Template.bind({});
WithoutUsertag.args = {
  tags: [],
};
