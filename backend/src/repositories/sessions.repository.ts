import { Session } from '../models/sessions.model';

export interface SessionsRepository {
  findSession(sessionToken: string): Promise<Session>;

  createSession(username: string): Promise<Session>;
}
