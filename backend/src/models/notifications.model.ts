import mongoose, { Document, Schema } from 'mongoose';
import { NotificationEvent } from '../types/notifications';

const NotificationsSchema: Schema = new Schema(
  {
    recipient: String,
    type: String,
    commentText: String,
    user: String,
    userAvatarReference: String,
    postId: String,
    postImageReference: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret): NotificationEvent {
        return {
          type: ret.type,
          commentText: ret.commentText,
          user: ret.user,
          userAvatarReference: ret.userAvatarReference,
          postId: ret.postId,
          postImageReference: ret.postImageReference,
          createdAt: ret.createdAt,
        };
      },
    },
  },
);

export const Notifications = mongoose.model<NotificationEvent & Document>(
  'Notifications',
  NotificationsSchema,
);
