import {
  Controller,
  Get,
  Route,
  SuccessResponse,
  Request,
  Security,
} from 'tsoa';
import { MongoNotificationsRepository } from '../repositories/mongo/mongo.notifications.repository';
import { NotificationEvent } from '../types/notifications';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { AuthScope } from '../middlewares/authorization';

@Route('notifications')
export class NotificationsController extends Controller {
  private notificationsRepository: NotificationsRepository = new MongoNotificationsRepository();

  @Security(AuthScope.AUTH)
  @Get()
  @SuccessResponse('200, OK')
  public async getNotifications(
    @Request() req: any,
  ): Promise<NotificationEvent[]> {
    return Promise.resolve(
      this.notificationsRepository.getNotifications(req.user.username),
    ).then(
      (notifications: NotificationEvent[]) => {
        this.setStatus(200);
        return notifications;
      },
      (err) => {
        throw err;
      },
    );
  }
}
