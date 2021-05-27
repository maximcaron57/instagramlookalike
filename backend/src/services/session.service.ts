import { UsersRepository } from '../repositories/users.repository';
import { MongoUsersRepository } from '../repositories/mongo/mongo.users.repository';
import { SessionsRepository } from '../repositories/sessions.repository';
import { MongoSessionsRepository } from '../repositories/mongo/mongo.sessions.repository';
import { User } from '../types/users';
import { Session } from '../models/sessions.model';

export class SessionService {
  private usersRepository: UsersRepository = new MongoUsersRepository();
  private sessionsRepository: SessionsRepository = new MongoSessionsRepository();

  public async authenticateUser(params: {
    googleId: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarReference: string;
  }): Promise<User & Session> {
    const user = await this.usersRepository.findOrCreateUser(params);
    const session = await this.sessionsRepository.createSession(user.username);
    return { ...user, ...session };
  }

  public async findAuthenticated(sessionToken: string): Promise<User> {
    const session = await this.sessionsRepository.findSession(sessionToken);
    return this.usersRepository.getUser(session.user);
  }
}
