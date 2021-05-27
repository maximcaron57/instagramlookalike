import {
  User,
  UserCreationParams,
  UserModificationParams,
} from '../types/users';
import { PagedResults } from '../types/paged.results';

export interface UsersRepository {
  findOrCreateUser(params: {
    googleId: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarReference: string;
  }): Promise<User>;

  getUsers(
    username: string,
    limit: number,
    before?: string | null,
    after?: string | null,
  ): Promise<PagedResults<User>>;

  getUser(username: string): Promise<User>;

  createUser(params: UserCreationParams): Promise<User>;

  updateUser(username: string, params: UserModificationParams): Promise<User>;

  deleteUser(username: string): Promise<any>;
}
