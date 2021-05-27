import React from 'react';
import { render } from '@testing-library/react';
import { UserFactory } from 'factories/UserFactory';
import { UserHeaderDesktop } from './UserHeaderDesktop';
import { UserHeaderMobile } from './UserHeaderMobile';

const user = UserFactory.make();
const stats = {
  totalPost: 45,
};

describe('When rendering UserHeader', () => {
  it('Should render UserHeaderMobile when on mobile device', () => {
    global.innerWidth = 500;

    render(
      <UserHeaderMobile
        fullname={user.firstName}
        description={user.description}
        username={user.username}
        stats={stats}
        createdAt={user.createdAt}
      />
    );
  });

  it('Should render UserHeaderDesktop when not on mobile device', () => {
    global.innerWidth = 1200;

    render(
      <UserHeaderDesktop
        fullname={user.firstName}
        description={user.description}
        username={user.username}
        stats={stats}
        createdAt={user.createdAt}
      />
    );
  });
});
