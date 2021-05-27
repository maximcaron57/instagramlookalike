import React from 'react';
import { render } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import useGetPosts from 'hooks/posts/useGetPosts';
import { PostFactory } from 'factories/PostFactory';
import SearchListPosts from './SearchListPosts';

const posts = PostFactory.make(4);

jest.mock('hooks/posts/useGetPosts');

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

const postsResponse = {
  posts: {
    results: posts,
    firstKey: posts[0].id,
    lastKey: posts[posts.length - 1].id,
    count: posts.length,
  },
  error: null,
  isLoading: false,
};

describe('When rendering SearchImage of 4 posts', () => {
  beforeEach(() => {
    useGetPosts.mockReturnValue(postsResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render an images list', () => {
    render(wrapInMemoryRouter(<SearchListPosts />));
  });
});
