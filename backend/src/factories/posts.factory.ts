import { factory } from 'node-factory';
import { createRandomImageSource } from './random.image.source.factory';
import { ComparablePost, SavedPost } from '../types/posts';
import { createComparableCreatedAt } from './comparable.created.at.factory';

export const PostFactory = factory<SavedPost & ComparablePost>((fake) => {
  const id = fake.random.uuid();
  const createdAt = new Date();
  const comparableCreatedAt = createComparableCreatedAt(id, createdAt);

  return {
    id,
    reference: createRandomImageSource(fake.random.word(), 500),
    thumbnail: createRandomImageSource(fake.random.word(), 500),
    description: fake.lorem.words(50),
    usertags: [],
    hashtags: [fake.lorem.word(), fake.lorem.word()],
    reactions: [],
    comments: [],
    user: '',
    createdAt,
    comparableCreatedAt,
  };
});
