export interface NotificationEvent {
  type: NotificationType;
  commentText?: string;
  user: string;
  userAvatarReference?: string;
  postId: string;
  postImageReference: string;
  createdAt: Date;
}

export interface NotificationCreationParams {
  recipient: string;
  type: NotificationType;
  commentText?: string;
  user: string;
  userAvatarReference?: string;
  postId: string;
  postImageReference: string;
}

export enum NotificationType {
  REACTION = 'reaction',
  COMMENT = 'comment',
}

export interface Subscriber {
  username: string;
  response: any;
}
