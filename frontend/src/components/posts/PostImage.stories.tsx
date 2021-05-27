import React from 'react';
import { Story } from '@storybook/react';
import { PostFactory } from 'factories/PostFactory';
import PostImage, { PostImageProps } from './PostImage';

const post = PostFactory.make();

export default {
  title: 'components/posts/PostImage',
  component: PostImage,
};

const Template: Story<PostImageProps> = ({ ...args }) => (
  <PostImage {...args} />
);

export const WithImage = Template.bind({});
WithImage.args = {
  reference: post.reference,
};

export const WithoutImage = Template.bind({});
