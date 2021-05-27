import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { theme } from 'layouts/Theme';
import MenuItem from '@material-ui/core/MenuItem';
import { Box } from '@material-ui/core';

export interface MenuElementProps {
  text: string;
  icon?: any;
}

const useStyles = makeStyles(() =>
  createStyles({
    menuItem: {
      color: 'white',
      '&:hover': {
        backgroundColor: purple[100],
        color: theme.palette.primary.main,
      },
    },
  })
);

export const MenuElement: React.FC<MenuElementProps> = (
  props: MenuElementProps
) => {
  const classes = useStyles();
  return (
    <MenuItem className={classes.menuItem}>
      {props.icon && (
        <Box mr={1} display="flex">
          {props.icon}
        </Box>
      )}
      {props.text}
    </MenuItem>
  );
};
