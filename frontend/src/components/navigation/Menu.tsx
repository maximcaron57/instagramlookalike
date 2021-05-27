import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuList from '@material-ui/core/MenuList';
import { MenuElement } from './MenuElement';
import { ButtonMenuElement } from './ButtonMenuElement';
import { useMenuStyles } from './MenuStyle';

export interface MenuProps {
  close: (event: any) => void;
  handleListKeyDown: (event: any) => void;
  open: boolean;
  anchorRef: any;
  username: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    highOrderPosition: {
      zIndex: 3000,
    },
  })
);

export const Menu: React.FC<MenuProps> = (props: MenuProps) => {
  const classes = useMenuStyles();
  const localClasses = useStyles();
  return (
    <Box className={localClasses.highOrderPosition}>
      <Popper open={props.open} anchorEl={props.anchorRef.current} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper className={classes.menuPaper}>
              <ClickAwayListener onClickAway={props.close}>
                <MenuList
                  autoFocusItem={props.open}
                  id="menu-list-grow"
                  onKeyDown={props.handleListKeyDown}
                >
                  <ButtonMenuElement
                    href={`/users/${props.username}`}
                    text="Profile"
                    icon={<AccountCircleOutlinedIcon />}
                  />
                  <ButtonMenuElement
                    href="/settings"
                    text="Settings"
                    icon={<SettingsIcon />}
                  />
                  <a
                    href={`${process.env.REACT_APP_BACKEND_URL}/auth/logout`}
                    className={classes.menuItemLink}
                  >
                    <MenuElement text="Logout" icon={<ExitToAppIcon />} />
                  </a>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};
