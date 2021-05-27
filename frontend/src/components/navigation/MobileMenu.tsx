import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ButtonMenuElement } from './ButtonMenuElement';
import { MenuElement } from './MenuElement';
import { useMenuStyles } from './MenuStyle';

export interface MobileMenuProps {
  close: (event: any) => void;
  open: boolean;
  anchor: any;
  username: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = (
  props: MobileMenuProps
) => {
  const classes = useMenuStyles();
  return (
    <Drawer
      anchor={props.anchor}
      open={props.open}
      onClose={props.close}
      classes={{ paper: classes.menuPaper }}
    >
      <div role="presentation" onClick={props.close}>
        <List>
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
        </List>
      </div>
    </Drawer>
  );
};
