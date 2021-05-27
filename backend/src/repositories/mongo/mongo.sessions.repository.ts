import { DeserializationError } from '../../types/errors';
import { SessionsRepository } from '../sessions.repository';
import { Session, Sessions } from '../../models/sessions.model';
import { v4 as uuidv4 } from 'uuid';

export class MongoSessionsRepository implements SessionsRepository {
  public async findSession(sessionToken: string): Promise<Session> {
    const session = await Sessions.findOne({ token: sessionToken }).exec();
    if (session) {
      return session.toJSON();
    }
    throw new DeserializationError('Invalid session token');
  }

  public async createSession(username: string): Promise<Session> {
    return (
      await Sessions.create({
        token: uuidv4(),
        startTime: Date.now(),
        user: username,
      })
    ).toJSON();
  }
}
