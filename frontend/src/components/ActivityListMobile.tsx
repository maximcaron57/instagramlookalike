import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { ActivityListItems } from './ActivityListItems';
import { NotificationEvent } from '../types/notifications';

export interface ActivityListProps {
  notifications: NotificationEvent[];
  close: any;
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'fixed',
      zIndex: 999,
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

export const ActivityListMobile: React.FC<ActivityListProps> = (
  props: ActivityListProps
) => {
  const classes = useStyles();
  const { notifications, close, open } = props;
  const handleClose = () => {
    close();
  };

  React.useEffect(() => {
    function handleResize() {
      close();
    }
    window.addEventListener('resize', handleResize);
  });

  return (
    <div>
      <Dialog
        fullScreen
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Activity
            </Typography>
          </Toolbar>
        </AppBar>
        <ActivityListItems
          notifications={notifications}
          close={close}
          isMobile
        />
      </Dialog>
    </div>
  );
};
export default ActivityListMobile;
