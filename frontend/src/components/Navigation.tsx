import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { User, UserModificationParams } from 'types/users';
import { ROUTE_PATHS } from 'router/Config';
import useUpdateUser from 'hooks/users/useUpdateUser';
import { SearchBar } from './search/SearchBar';
import { MobileBar } from './MobileBar';
import { UserAvatar } from './users/avatar/UserAvatar';
import ActivityList from './ActivityList';
import CreatePost from './posts/CreatePost';
import { ModalBox } from './ModalBox';
import { Menu } from './navigation/Menu';
import useGetNotifications from '../hooks/notifications/useGetNotifications';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    titleLink: {
      textDecoration: 'none',
      color: 'white',
    },
    title: {
      display: 'flex',
      fontFamily: ['Rock Salt', 'cursive'].join(','),
      width: '90px',
      fontSize: '1.1rem',
    },
    titleMobile: {
      display: 'flex',
      fontFamily: ['Rock Salt', 'cursive'].join(','),
      width: '30px',
      fontSize: '1.1rem',
      marginRight: '20px',
    },
    navButton: {
      color: 'white',
      display: 'flex',
    },
    userButton: {
      marginLeft: '20px',
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    loginContainer: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 20,
    },
  })
);

export interface NavigationProps {
  loggedUser?: User | null;
}

export const Navigation: React.FC<NavigationProps> = (
  props: NavigationProps
) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openList, setOpenList] = React.useState(false);
  const menuAnchorRef = React.useRef(null);
  const listAnchorRef = React.useRef(null);
  const { loggedUser } = props;
  const { notifications } = useGetNotifications();
  const [notifiedAt, setNotifiedAt] = useState<UserModificationParams>();

  const { updateUser } = useUpdateUser(loggedUser.username, notifiedAt);

  const inSearchView = useLocation().pathname.endsWith('/search');

  const handleToggleMenu = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleCloseMenu = (event) => {
    if (menuAnchorRef.current && menuAnchorRef.current.contains(event.target)) {
      return;
    }
    setOpenMenu(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpenMenu(false);
    }
  }

  // return focus to the avatar when we transitioned from !open -> open
  const prevOpenMenu = React.useRef(openMenu);

  useEffect(() => {
    if (prevOpenMenu.current === true && openMenu === false) {
      menuAnchorRef.current.focus();
    }
    prevOpenMenu.current = openMenu;
  }, [openMenu]);

  const getNewNotifications = () => {
    return (
      notifications.filter(
        (notification) => notification.createdAt > loggedUser.notifiedAt
      ) || []
    );
  };

  const handleToggleList = () => {
    if (!openList) {
      updateNotification();
      setOpenList(true);
    } else {
      setOpenList(false);
    }
  };

  const updateNotification = () => {
    setNotifiedAt({ notifiedAt: new Date(Date.now()) });
  };

  const handleCloseList = (event) => {
    if (
      event &&
      listAnchorRef.current &&
      listAnchorRef.current.contains(event.target)
    ) {
      return;
    }
    setOpenList(false);
  };

  useEffect(() => {
    updateUser();
  }, [notifiedAt, openList]);

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
      <IconButton
        ref={listAnchorRef}
        id="notifications-button"
        color="inherit"
        aria-label="Open activity list"
        onClick={handleToggleList}
      >
        <Badge badgeContent={getNewNotifications().length} color="secondary">
          <NotificationsIcon />
        </Badge>
        <ActivityList
          notifications={notifications}
          open={openList}
          close={handleCloseList}
          anchorRef={listAnchorRef}
        />
      </IconButton>

      <IconButton
        ref={menuAnchorRef}
        className={classes.userButton}
        id="user-button"
        color="inherit"
        aria-label="Open settings view"
        onClick={handleToggleMenu}
      >
        <UserAvatar
          src={loggedUser.avatarReference}
          size="small"
          username={loggedUser.username}
        />
        <Menu
          open={openMenu}
          close={handleCloseMenu}
          anchorRef={menuAnchorRef}
          handleListKeyDown={handleListKeyDown}
          username={loggedUser.username}
        />
      </IconButton>
    </>
  ) : null;

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.sectionDesktop}>
            <Link to={ROUTE_PATHS.home} className={classes.titleLink}>
              <Typography variant="h6" noWrap className={classes.title}>
                UGram
              </Typography>
            </Link>
          </div>
          <div className={classes.sectionMobile}>
            <Link to={ROUTE_PATHS.home} className={classes.titleLink}>
              <Typography variant="h6" noWrap className={classes.titleMobile}>
                UG
              </Typography>
            </Link>
          </div>
          <SearchBar inSearchView={inSearchView} />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to={ROUTE_PATHS.home} className={classes.navButton}>
              <IconButton id="home-button" color="inherit" aria-label="Go home">
                <HomeIcon />
              </IconButton>
            </Link>
            <Link to={ROUTE_PATHS.search()} className={classes.navButton}>
              <IconButton
                id="search-button"
                color="inherit"
                aria-label="Go to search page"
              >
                <SearchIcon />
              </IconButton>
            </Link>
            {loggedUserButtons}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.sectionMobile}>
        <MobileBar
          loggedUser={loggedUser}
          notifications={notifications}
          getNewNotifications={getNewNotifications}
          updateNotification={updateNotification}
        />
      </div>
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
    </div>
  );
};

Navigation.defaultProps = {
  loggedUser: null,
};
