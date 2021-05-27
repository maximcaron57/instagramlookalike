import { Users, Posts } from '../connect.models';
import {
  defaultNonExistentField,
  deleteExistentField,
} from './migrations.utils';

exports.up = async (done: any) => {
  await Users.collection.bulkWrite([defaultNonExistentField('fake', false)]);

  await Posts.collection.bulkWrite([defaultNonExistentField('fake', false)]);

  done();
};

exports.down = async (done: any) => {
  await Users.collection.bulkWrite([deleteExistentField('fake')]);

  await Posts.collection.bulkWrite([deleteExistentField('fake')]);

  done();
};
