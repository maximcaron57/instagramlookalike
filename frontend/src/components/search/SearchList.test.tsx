import React from 'react';
import { render } from 'enzyme';
import { UserFactory } from 'factories/UserFactory';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import useGetUsers from 'hooks/users/useGetUsers';
import useGetHashtags from 'hooks/hashtags/useGetHashtags';
import SearchList from './SearchList';

const users = UserFactory.make(3);
// TODO : HashtagFactory would be nice.
const hashtags = [
  { name: 'peace', count: 150 },
  { name: 'love', count: 300 },
];

jest.mock('hooks/users/useGetUsers');
jest.mock('hooks/hashtags/useGetHashtags');

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

const searchListProps1 = {
  tab: 0,
};

const searchListProps2 = {
  tab: 1,
};

const searchListProps3 = {
  tab: 2,
};

const usersResponse = {
  users: {
    results: users,
    firstKey: users[0].username,
    lastKey: users[users.length - 1].username,
    count: users.length,
  },
  error: null,
  isLoading: false,
};

const hashtagsResponse = {
  hashtags,
  error: null,
  isLoading: false,
};

describe('When rendering SearchList', () => {
  beforeEach(() => {
    useGetUsers.mockReturnValue(usersResponse);
    useGetHashtags.mockReturnValue(hashtagsResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render user list', () => {
    render(wrapInMemoryRouter(<SearchList {...searchListProps1} />));
  });

  it('Should render user list', () => {
    render(wrapInMemoryRouter(<SearchList {...searchListProps2} />));
  });

  it('Should render user list', () => {
    render(wrapInMemoryRouter(<SearchList {...searchListProps3} />));
  });
});
