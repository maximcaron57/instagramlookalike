export enum NotificationType {
  REACTION = 'reaction',
  COMMENT = 'comment',
}

export interface NotificationEvent {
  type: NotificationType;
  commentText?: string;
  user: string;
  userAvatarReference?: string;
  postId: string;
  postImageReference: string;
  createdAt: Date;
}
