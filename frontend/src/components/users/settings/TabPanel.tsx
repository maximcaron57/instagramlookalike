import React from 'react';
import Box from '@material-ui/core/Box';

interface tabPanelProps {
  children?: any | null;
  index: any;
  value: any;
}

TabPanel.defaultProps = {
  children: null,
};

export function TabPanel(props: tabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
