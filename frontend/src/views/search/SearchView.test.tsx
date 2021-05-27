import React from 'react';
import { render } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';

import { PostFactory } from 'factories/PostFactory';
import useGetPosts from 'hooks/posts/useGetPosts';
import SearchView from './SearchView';

const posts = PostFactory.make(4);

const postsResponse = {
  posts: {
    results: posts,
    firstKey: posts[0].createdAt.toISOString(),
    lastKey: posts[posts.length - 1].createdAt.toISOString(),
    count: posts.length,
  },
  error: null,
  isLoading: false,
};

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

describe('When rendering SearchView', () => {
  beforeEach(() => {
    useGetPosts.mockReturnValue(postsResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render', () => {
    render(wrapInMemoryRouter(<SearchView />));
  });
});
