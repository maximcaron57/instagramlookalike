import { logger } from './logger';
import { Subscriber } from '../types/notifications';

export let subscribers: Subscriber[] = [];

export const registerEventsRoute = (app: any) => {
  app.get('/events', (request: any, response: any, next: any) => {
    const username = request.session.user.username;

    if (!username) {
      next();
      return;
    }

    const headers = {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
    };
    response.writeHead(200, headers);

    subscribers.push({
      username: username,
      response,
    });
    logger.info(`Connection opened with ${username}`);

    request.on('close', () => {
      logger.info(`Connection closed with ${username}`);
      subscribers = subscribers.filter(
        (subscriber: any) => subscriber.username !== username,
      );
    });

    return;
  });
};
