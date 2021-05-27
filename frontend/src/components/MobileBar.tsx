import React, { useState, Fragment } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from 'react-router-dom';
import { User } from 'types/users';
import { ROUTE_PATHS } from 'router/Config';
import { UserAvatar } from './users/avatar/UserAvatar';
import { ModalBox } from './ModalBox';
import CreatePost from './posts/CreatePost';
import { MobileMenu } from './navigation/MobileMenu';
import { NotificationEvent } from '../types/notifications';
import ActivityListMobile from './ActivityListMobile';

const useStyles = makeStyles(
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: '15px',
      height: '30px',
      width: '30px',
    },
    toolbar: {
      minHeight: '15px',
    },
    navButton: {
      color: `white`,
      display: 'flex',
    },
    userButton: {
      marginLeft: '20px',
    },
  })
);

export interface MobileBarProps {
  loggedUser?: User | null;
  notifications: NotificationEvent[];
  getNewNotifications?: any;
  updateNotification?: any;
}

export const MobileBar: React.FC<MobileBarProps> = ({
  loggedUser,
  notifications,
  getNewNotifications,
  updateNotification,
}) => {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [openActivityDialog, setOpenActivityDialog] = React.useState(false);

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenMenu(open);
  };

  const handleOpenList = () => {
    if (!openActivityDialog) {
      setOpenActivityDialog(true);
      updateNotification();
    }
  };

  const handleCloseList = () => {
    setOpenActivityDialog(false);
  };

  const getNumberOfNotification = () => {
    if (getNewNotifications()) {
      return getNewNotifications().length;
    }
    return 0;
  };

  const loggedUserButtons = loggedUser ? (
    <>
      <IconButton
        id="add-post-button"
        color="inherit"
        aria-label="Add post"
        onClick={() => setOpenModal(true)}
      >
        <AddIcon />
      </IconButton>
      {['bottom'].map((anchor) => (
        <Fragment key={anchor}>
          <IconButton
            className={classes.userButton}
            id="user-button"
            color="inherit"
            onClick={toggleDrawer(anchor, true)}
          >
            <UserAvatar
              src={loggedUser.avatarReference}
              size="small"
              username={loggedUser.username}
            />
          </IconButton>
          <MobileMenu
            close={closeMenu}
            open={openMenu}
            anchor={anchor}
            username={loggedUser.username}
          />
        </Fragment>
      ))}
    </>
  ) : null;

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link to={ROUTE_PATHS.home} className={classes.navButton}>
            <IconButton color="inherit" aria-label="Go home">
              <HomeIcon id="home-button" />
            </IconButton>
          </Link>
          <Link to={ROUTE_PATHS.search} className={classes.navButton}>
            <IconButton
              id="search-button"
              color="inherit"
              aria-label="Go to search page"
            >
              <SearchIcon />
            </IconButton>
          </Link>
          <ModalBox
            openModal={openModal}
            closeModal={() => setOpenModal(false)}
            title="Create Post"
          >
            <CreatePost
              username={loggedUser?.username}
              successAction={() => setOpenModal(false)}
            />
          </ModalBox>
          <IconButton
            id="notifs-button"
            aria-label="notifications"
            color="inherit"
            onClick={handleOpenList}
          >
            <Badge badgeContent={getNumberOfNotification()} color="secondary">
              <NotificationsIcon />
            </Badge>
            <ActivityListMobile
              notifications={notifications}
              open={openActivityDialog}
              close={handleCloseList}
            />
          </IconButton>
          <div className={classes.grow} />
          {loggedUserButtons}
        </Toolbar>
      </AppBar>
    </>
  );
};

MobileBar.defaultProps = {
  loggedUser: null,
};
