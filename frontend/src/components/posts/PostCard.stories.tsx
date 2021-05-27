import React from 'react';
import { Story } from '@storybook/react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import PostCard, { PostCardProps } from './PostCard';

const post = PostFactory.make();

export default {
  title: 'components/posts/PostCard',
  component: PostCard,
};

const Template: Story<PostCardProps> = ({ ...args }) =>
  wrapInMemoryRouter(<PostCard {...args} />);

export const WithoutLoggedUser = Template.bind({});
WithoutLoggedUser.args = {
  post,
};

export const WithLoggedUser = Template.bind({});
WithLoggedUser.args = {
  post,
};
