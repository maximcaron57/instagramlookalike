import { factory } from 'node-factory';
import { generateRandomImageSource } from 'util/generateRandomImageSource';
import { User } from 'types/users';

export const UserFactory = factory<User>((fake) => ({
  username: fake.internet.userName(),
  email: fake.internet.email(),
  phoneNumber: fake.phone.phoneNumber('###-###-####'),
  firstName: fake.name.firstName(),
  lastName: fake.name.lastName(),
  description: fake.lorem.words(20),
  avatarReference: generateRandomImageSource(fake.random.word(), 200),
  notifiedAt: fake.date.recent(5),
  createdAt: fake.date.recent(10),
}));
