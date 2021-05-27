import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { UserFactory } from 'factories/UserFactory';
import { MobileBar } from './MobileBar';
import { UserAvatar } from './users/avatar/UserAvatar';
import { MobileMenu } from './navigation/MobileMenu';
import { NotificationEvent, NotificationType } from '../types/notifications';

const user = UserFactory.make();
const notifications: NotificationEvent[] = [
  {
    type: NotificationType.COMMENT,
    commentText: 'allo toi',
    user: 'test',
    postId: '6062629da4a5c000388ceb13',
    postImageReference: '',
    createdAt: new Date(Date.now()),
  },
];

const getNewNotifications = jest.fn();

describe('When rendering MobileBar', () => {
  it('Should render', () => {
    render(
      wrapInMemoryRouter(
        <MobileBar
          loggedUser={user}
          notifications={notifications}
          getNewNotifications={getNewNotifications}
        />
      )
    );
  });

  const layout = shallow(
    <MobileBar
      loggedUser={user}
      notifications={notifications}
      getNewNotifications={getNewNotifications}
    />
  );
  test('Renders all components', () => {
    expect(layout.find(MobileMenu)).toHaveLength(1);
    expect(layout.find(IconButton)).toHaveLength(5);
    expect(layout.find(Badge)).toHaveLength(1);
    expect(layout.contains('1'));
    expect(layout.find(UserAvatar)).toHaveLength(1);
  });
});
