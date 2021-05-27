import { Users } from './models/users.model';
import { Posts } from './models/posts.model';
import { connectDatabase } from './connect.database';

connectDatabase();

export { Users, Posts };
