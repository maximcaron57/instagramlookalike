import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { purple } from '@material-ui/core/colors';
import { List, ListItem } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { ROUTE_PATHS } from 'router/Config';
import { UserAvatar } from './users/avatar/UserAvatar';
import { NotificationEvent, NotificationType } from '../types/notifications';

export interface ActivityListItemsProps {
  notifications: NotificationEvent[];
  close: (event: any) => void;
  isMobile?: boolean;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 600,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
      marginBottom: 10,
    },
    mobile: {
      width: '100%',
      marginTop: 65,
      marginBottom: 10,
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    listItem: {
      '&:hover': {
        backgroundColor: purple[50],
        cursor: 'pointer',
      },
    },
    listItemText: {
      overflow: 'hidden',
      marginTop: '10px',
      marginLeft: '10px',
      marginRight: '10px',
    },
    inline: {
      display: 'inline',
    },
  })
);

const getNotificationText = (notification: NotificationEvent) => {
  if (notification.type === NotificationType.COMMENT) {
    return `${notification.user} commented: `;
  }
  return `${notification.user} liked your photo.`;
};

const getNotificationPeriod = (notification: NotificationEvent) => {
  const currentDate = new Date(Date.now());
  const createdDate = new Date(notification.createdAt);
  const numberOfUnits =
    Math.round(currentDate.getTime() - createdDate.getTime()) / 1000;
  if (Math.round(numberOfUnits / (60 * 60 * 24)) > 0) {
    return `${Math.round(numberOfUnits / (60 * 60 * 24))}j`;
  }
  if (Math.round(numberOfUnits / (60 * 60))) {
    return `${Math.round(numberOfUnits / (60 * 60))}h`;
  }
  if (Math.round(numberOfUnits / 60) > 0) {
    return `${Math.round(numberOfUnits / 60)}m`;
  }
  return `${Math.round(numberOfUnits)}s`;
};

export const ActivityListItems: React.FC<ActivityListItemsProps> = (
  props: ActivityListItemsProps
) => {
  const history = useHistory();
  const classes = useStyles();
  const { notifications, close, isMobile } = props;

  return (
    <List
      className={isMobile ? classes.mobile : classes.root}
      subheader={<li />}
    >
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <ul key={notification.createdAt.toString()} className={classes.ul}>
            <ListItem
              className={classes.listItem}
              key={notification.createdAt.toString()}
              onClick={(event: any) => {
                history.push(ROUTE_PATHS.post(`${notification.postId}`));
                close(event);
              }}
            >
              <UserAvatar
                size="small"
                username={notification.user}
                src={notification.userAvatarReference}
              />
              <ListItemText
                className={classes.listItemText}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {getNotificationText(notification)}
                    </Typography>
                    {notification.commentText} {` `}
                    {getNotificationPeriod(notification)}
                  </>
                }
              />
              <Avatar
                variant="square"
                alt={notification.user}
                src={notification.postImageReference}
              />
            </ListItem>
          </ul>
        ))
      ) : (
        <ListItem>
          <ListItemText>No notifications found.</ListItemText>
        </ListItem>
      )}
    </List>
  );
};

export default ActivityListItems;
