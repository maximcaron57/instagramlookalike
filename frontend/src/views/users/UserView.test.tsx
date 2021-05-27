import React from 'react';
import { render, mount } from 'enzyme';
import { expect } from 'chai';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { HelmetProvider } from 'react-helmet-async';
import { PostFactory } from 'factories/PostFactory';
import { UserFactory } from 'factories/UserFactory';
import { UserHeader } from 'components/users/header/UserHeader';
import useGetUser from 'hooks/users/useGetUser';
import useGetUserPosts from 'hooks/users/useGetUserPosts';
import UserView from './UserView';

const username = 'username';
const user = UserFactory.make();
const post = PostFactory.make();

const userResponse = {
  user,
  error: null,
  isLoading: false,
};

const userPostsResponse = {
  posts: {
    results: [post],
    count: 1,
  },
  error: null,
  isLoading: false,
};

jest.mock('hooks/users/useGetUser');
jest.mock('hooks/users/useGetUserPosts');
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

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ username }),
}));

describe('When rendering UserView', () => {
  beforeEach(() => {
    useGetUser.mockReturnValue(userResponse);
    useGetUserPosts.mockReturnValue(userPostsResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render', () => {
    render(<HelmetProvider>{wrapInMemoryRouter(<UserView />)}</HelmetProvider>);
  });

  it('Should display UserHeader', () => {
    const wrapper = mount(
      <HelmetProvider>
        {wrapInMemoryRouter(<UserView username={username} />)}
      </HelmetProvider>
    );
    const componentExists = wrapper.containsMatchingElement(
      <UserHeader
        username={user.username}
        stats={{ totalPost: userPostsResponse.posts.count }}
        fullname={`${user.firstName} ${user.lastName}`}
        description={user.description}
        avatarSrc={user.avatarReference}
        createdAt={user.createdAt}
      />
    );
    expect(componentExists).to.be.equal(true);
  });
});
