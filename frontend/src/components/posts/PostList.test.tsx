import React from 'react';
import { render, shallow } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import PostList from './PostList';
import PostCard from './PostCard';

const posts = PostFactory.make(3);

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  const randomElement =
    '<Box><Box><Box id="content">{element}</div><div id="target" data-target-tag-name={target.tagName}></Box></Box></Box>';

  return {
    ...original,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createPortal: (node: any) => randomElement,
  };
});

describe('When rendering PostList', () => {
  it('Should contain a post card for each post', () => {
    const wrapper = shallow(<PostList posts={posts} />);

    posts.forEach((post) => {
      expect(wrapper.containsMatchingElement(<PostCard post={post} />)).toEqual(
        true
      );
    });
  });

  it('Should render PostList', () => {
    render(wrapInMemoryRouter(<PostList posts={posts} />));
  });
});
