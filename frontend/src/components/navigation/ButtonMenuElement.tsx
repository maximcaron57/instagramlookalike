import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { MenuElement } from './MenuElement';

export interface ButtonMenuElementProps {
  href: string;
  text: string;
  icon?: any;
}

const useStyles = makeStyles(() =>
  createStyles({
    menuItemLink: {
      textDecoration: 'none',
    },
  })
);

export const ButtonMenuElement: React.FC<ButtonMenuElementProps> = (
  props: ButtonMenuElementProps
) => {
  const classes = useStyles();
  return (
    <Link to={props.href} className={classes.menuItemLink}>
      <MenuElement text={props.text} icon={props.icon} />
    </Link>
  );
};
