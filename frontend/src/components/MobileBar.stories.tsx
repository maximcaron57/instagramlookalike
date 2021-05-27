import React from 'react';
import { UserFactory } from 'factories/UserFactory';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { MobileBar } from './MobileBar';
import { NotificationEvent, NotificationType } from '../types/notifications';

const user = UserFactory.make();
const notifications: NotificationEvent[] = [
  {
    type: NotificationType.COMMENT,
    commentText: 'allo toi',
    user: 'test',
    postId: '6062629da4a5c000388ceb13',
    postImageReference: 'clown.png',
    createdAt: new Date(Date.now()),
  },
];

export default {
  title: 'components/MobileBar',
  component: MobileBar,
};

export const WithLoggedUser = () =>
  wrapInMemoryRouter(
    <MobileBar loggedUser={user} notifications={notifications} />
  );

export const WithoutLoggedUser = () =>
  wrapInMemoryRouter(<MobileBar notifications={notifications} />);
