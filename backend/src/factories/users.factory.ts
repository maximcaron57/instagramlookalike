import { factory } from 'node-factory';
import { User } from '../types/users';
import { createRandomImageSource } from './random.image.source.factory';

export const UserFactory = factory<User>((fake) => ({
  username: fake.internet.userName(),
  email: fake.internet.email(),
  phoneNumber: fake.phone.phoneNumber('###-###-####'),
  firstName: fake.name.firstName(),
  lastName: fake.name.lastName(),
  description: fake.random.words(20),
  avatarReference: createRandomImageSource(fake.random.word(), 200),
  notifiedAt: new Date(),
  createdAt: new Date(),
}));
