import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { ActivityListItems } from './ActivityListItems';
import { NotificationEvent } from '../types/notifications';

const useStyles = makeStyles((theme: Theme) => {
  const color = theme.palette.background.paper;
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
    popoverRoot: {
      backgroundColor: color,
      maxWidth: 1000,
    },
    content: {
      padding: theme.spacing(2),
    },
    popper: {
      zIndex: 2000,
      '&[x-placement*="bottom"] $arrow': {
        top: 0,
        left: 0,
        marginTop: '-0.71em',
        marginLeft: 4,
        marginRight: 4,
        '&::before': {
          transformOrigin: '0 100%',
        },
      },
      '&[x-placement*="top"] $arrow': {
        bottom: 0,
        left: 0,
        marginBottom: '-0.71em',
        marginLeft: 4,
        marginRight: 4,
        '&::before': {
          transformOrigin: '100% 0',
        },
      },
      '&[x-placement*="right"] $arrow': {
        left: 0,
        marginLeft: '-0.71em',
        height: '1em',
        width: '0.71em',
        marginTop: 4,
        marginBottom: 4,
        '&::before': {
          transformOrigin: '100% 100%',
        },
      },
      '&[x-placement*="left"] $arrow': {
        right: 0,
        marginRight: '-0.71em',
        height: '1em',
        width: '0.71em',
        marginTop: 4,
        marginBottom: 4,
        '&::before': {
          transformOrigin: '0 0',
        },
      },
    },
    arrow: {
      overflow: 'hidden',
      position: 'absolute',
      width: '1em',
      height: '0.71em',
      boxSizing: 'border-box',
      color,
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
        boxShadow: theme.shadows[1],
        backgroundColor: 'currentColor',
        transform: 'rotate(45deg)',
      },
    },
  };
});

export interface ActivityListProps {
  notifications: NotificationEvent[];
  close: (event: any) => void;
  open: boolean;
  anchorRef: any;
}

export const ActivityList: React.FC<ActivityListProps> = (
  props: ActivityListProps
) => {
  const classes = useStyles();
  const { notifications, close, open, anchorRef } = props;
  const [arrowRef, setArrowRef] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    function handleResize() {
      close(null);
    }
    window.addEventListener('resize', handleResize);
  });

  return (
    <ClickAwayListener onClickAway={close}>
      <Popper
        open={open}
        placement="top"
        className={classes.popper}
        anchorEl={anchorRef.current}
        modifiers={{
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
          },
          arrow: {
            enabled: true,
            element: arrowRef,
          },
        }}
      >
        <Paper elevation={5} square={false}>
          <span className={classes.arrow} ref={setArrowRef} />
          <ActivityListItems
            notifications={notifications}
            close={close}
            isMobile={false}
          />
        </Paper>
      </Popper>
    </ClickAwayListener>
  );
};
export default ActivityList;
