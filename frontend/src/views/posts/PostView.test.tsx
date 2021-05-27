import React from 'react';
import { mount, render } from 'enzyme';
import PostCard from 'components/posts/PostCard';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import { HelmetProvider } from 'react-helmet-async';
import useGetPost from '../../hooks/posts/useGetPost';
import PostView from './PostView';

const postId = 'postId';
const post = PostFactory.make();

const postResponse = {
  post,
  isLoading: false,
  error: null,
};

jest.mock('hooks/posts/useGetPost');

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ postId }),
}));

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

describe('When rendering Post', () => {
  beforeEach(() => {
    useGetPost.mockReturnValue(postResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render', () => {
    render(<HelmetProvider>{wrapInMemoryRouter(<PostView />)}</HelmetProvider>);
  });

  it('Should display a post', () => {
    const wrapper = mount(
      <HelmetProvider>
        {wrapInMemoryRouter(<PostView postId={post.id} />)}
      </HelmetProvider>
    );

    expect(
      wrapper.find(
        <PostCard
          post={post}
          refreshPost={() => undefined}
          detailedTags
          fullSizeImage
          disableCommentButton
        />
      )
    ).toBeTruthy();
  });
});
