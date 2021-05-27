import React from 'react';
import { Story } from '@storybook/react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import PostList, { PostListProps } from './PostList';

const posts = PostFactory.make(3);

export default {
  title: 'components/posts/PostList',
  component: PostList,
};

const Template: Story<PostListProps> = ({ ...args }) =>
  wrapInMemoryRouter(<PostList {...args} />);

export const WithPosts = Template.bind({});
WithPosts.args = {
  posts,
};

export const WithoutPost = Template.bind({});
WithoutPost.args = {
  posts: [],
};
