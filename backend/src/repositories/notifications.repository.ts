import {
  NotificationCreationParams,
  NotificationEvent,
} from '../types/notifications';

export interface NotificationsRepository {
  getNotifications(recipient: string): Promise<NotificationEvent[]>;
  createNotification(params: NotificationCreationParams): Promise<void>;
}
