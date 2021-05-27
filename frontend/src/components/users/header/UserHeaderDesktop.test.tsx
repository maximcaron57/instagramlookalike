import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import Box from '@material-ui/core/Box';
import { UserFactory } from 'factories/UserFactory';
import { UserAvatar } from 'components/users/avatar/UserAvatar';
import { UserInfoHeader } from 'components/users/info/UserInfoHeader';
import { UserInfoDescription } from 'components/users/info/UserInfoDescription';
import { UserInfoStats } from 'components/users/info/UserInfoStats';
import { UserHeaderDesktop } from './UserHeaderDesktop';

const user = UserFactory.make();
const stats = {
  totalPost: 45,
};

describe('When rendering UserHeaderDesktop', () => {
  it('Should render Box', () => {
    render(<Box />);
  });

  const wrapper = mount(
    <UserHeaderDesktop
      fullname={user.firstName}
      description={user.description}
      username={user.username}
      stats={stats}
      createdAt={user.createdAt}
    />
  );

  it('Should render UserAvatar component', () => {
    expect(
      wrapper.containsMatchingElement(<UserAvatar username={user.username} />)
    ).toBe(true);
  });

  it('Should render UserInfoHeader component', () => {
    expect(
      wrapper.containsMatchingElement(
        <UserInfoHeader username={user.username} />
      )
    ).toEqual(true);
  });

  it('Should render UserInfoDescription component', () => {
    expect(
      wrapper.containsMatchingElement(
        <UserInfoDescription
          fullname={user.firstName}
          description={user.description}
        />
      )
    ).toEqual(true);
  });

  it('Should render UserInfoStats component', () => {
    expect(
      wrapper.containsMatchingElement(<UserInfoStats stats={stats} />)
    ).toEqual(true);
  });
});
