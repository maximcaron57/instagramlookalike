import { makeStyles, createStyles } from '@material-ui/core/styles';
import { theme } from 'layouts/Theme';
import { purple } from '@material-ui/core/colors';

export const useMenuStyles = makeStyles(() =>
  createStyles({
    menuPaper: {
      backgroundColor: theme.palette.primary.main,
    },
    menuItemLink: {
      textDecoration: 'none',
    },
    menuItem: {
      color: 'white',
      '&:hover': {
        backgroundColor: purple[100],
        color: theme.palette.primary.main,
      },
    },
  })
);
