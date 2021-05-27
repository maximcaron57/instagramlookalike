import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export interface MenuProps {
  handleChange: (event: Event, index: number) => void;
  value: number;
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export const Menu = (props: MenuProps) => {
  const classes = useStyles();

  const handleChange = (event, index) => {
    props.handleChange(event, index);
  };

  const { value } = props;

  return (
    <Tabs
      orientation="vertical"
      value={value}
      onChange={handleChange}
      aria-label="Vertical tabs example"
      className={classes.tabs}
    >
      <Tab label="Edit profile" {...a11yProps(0)} color="primary" />
    </Tabs>
  );
};
