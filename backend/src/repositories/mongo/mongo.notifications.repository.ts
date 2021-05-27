import {
  NotificationCreationParams,
  NotificationEvent,
} from '../../types/notifications';
import { Notifications } from '../../models/notifications.model';
import { subscribers } from '../../middlewares/events';
import { logger } from '../../middlewares/logger';
import { NotificationsRepository } from '../notifications.repository';

export class MongoNotificationsRepository implements NotificationsRepository {
  public async getNotifications(
    recipient: string,
  ): Promise<NotificationEvent[]> {
    return (
      await Notifications.find({ recipient }).sort({
        createdAt: 'desc',
      })
    ).map((notification) => notification.toJSON());
  }

  public async createNotification(params: NotificationCreationParams) {
    const notification = (await Notifications.create(params)).toJSON();

    this.notify(params.recipient, notification);
  }

  private notify(recipient: string, message: NotificationEvent) {
    subscribers.forEach((subscriber: any) => {
      if (subscriber.username === recipient) {
        logger.info(`Notifying post owner ${recipient}`);
        subscriber.response.write(`data: ${JSON.stringify(message)}\n\n`);
        return;
      }
    });
  }
}
