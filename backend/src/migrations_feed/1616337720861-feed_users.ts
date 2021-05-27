import { Users } from '../connect.models';
import {
  deleteFakeDocuments,
  insertManyFakeDocuments,
} from './migrations.feed.utils';
import { UserFactory } from '../factories/users.factory';

const AMOUNT_OF_USERS_TO_FEED = 30;

exports.up = async (done: any) => {
  const insertOperations = insertManyFakeDocuments(
    UserFactory.make(AMOUNT_OF_USERS_TO_FEED),
  );
  await Users.collection.bulkWrite(insertOperations);

  done();
};

exports.down = async (done: any) => {
  await Users.collection.bulkWrite([deleteFakeDocuments()]);

  done();
};
