import { Users, Posts } from '../connect.models';
import {
  deleteFakeDocuments,
  insertManyFakeDocuments,
} from './migrations.feed.utils';
import { PostFactory } from '../factories/posts.factory';

const AMOUNT_OF_POSTS_TO_FEED_PER_USER = 30;

exports.up = async (done: any) => {
  const fakeUsers = await Users.find({ fake: true });
  const insertOperations: Array<any> = [];

  fakeUsers.forEach((fakeUser) => {
    insertOperations.push(
      ...insertManyFakeDocuments(
        PostFactory.make(AMOUNT_OF_POSTS_TO_FEED_PER_USER, {
          user: fakeUser.username,
          userAvatar: fakeUser.avatarReference,
        }),
      ),
    );
  });

  await Posts.collection.bulkWrite(insertOperations);

  done();
};

exports.down = async (done: any) => {
  await Posts.collection.bulkWrite([deleteFakeDocuments()]);

  done();
};
