import React, { useState } from 'react';
import {
  AppBar,
  Button,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import SnackbarAlert from './Snackbar';
import logout from './api-client/Logout';
import logo from './image/logo.png';

const useStyles = makeStyles(theme => ({
  logo: {
    maxWidth: 45,
    marginRight: theme.spacing(1),
  },
}));

const Header = () => {
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const classes = useStyles();
  // const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleLogout = () => {
    logout(setSnackbarInfo);
    // setShouldRedirect(true);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item>
            <Grid container>
              <img src={logo} alt="Logo" className={classes.logo} />
              <Typography variant="h6" className={classes.title}>
                File Market
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid container direction="row-reverse">
              <Grid item>
                <Button color="inherit" onClick={handleLogout}>
                  خروج
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <SnackbarAlert
          open={snackbarInfo.open}
          setOpen={e => setSnackbarInfo({ message: '', severity: 'success', open: e })}
          message={snackbarInfo.message}
          severity={snackbarInfo.severity}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
