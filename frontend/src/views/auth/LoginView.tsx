import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { HelmetHeader } from 'components/HelmetHeader';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { GoogleIcon } from 'assets/Icons/CustomIcons/GoogleIcon';
import { theme } from 'layouts/Theme';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      fontFamily: ['Rock Salt', 'cursive'].join(','),
      fontSize: '3rem',
    },
    button: {
      textTransform: 'none',
    },
  })
);

export const LoginView = () => {
  const classes = useStyles();
  const { currentUser } = useContext(UserContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Box display="flex" my={25}>
      <HelmetHeader title="UGRAM - Login" />
      <Box
        m="auto"
        display="flex"
        flexDirection="column"
        p={isMobile ? 2 : 5}
        border={1}
        borderColor="primary.main"
      >
        <Box mb={4} mx="auto">
          <Typography color="primary" noWrap className={classes.title}>
            UGram
          </Typography>
        </Box>
        <Box mx="auto">
          <a
            id="OAuthLoginButton"
            style={{ textDecoration: 'none' }}
            href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}
          >
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              startIcon={<GoogleIcon />}
            >
              <b>Log in with Google</b>
            </Button>
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginView;
