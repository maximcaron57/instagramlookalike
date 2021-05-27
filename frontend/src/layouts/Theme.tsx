import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: purple,
  },
  typography: {
    fontFamily: ['Noto+Sans', 'sans-serif'].join(','),
  },
});
