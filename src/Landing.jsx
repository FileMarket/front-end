import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FileList from './FileList';
import logo from './image/logo.png';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    {' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
    maxWidth: 45,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Landing = () => {
  const classes = useStyles();
  const [shouldRedirect, setShouldRedirect] = useState(0);

  return shouldRedirect === 1
    ? <Redirect to="/login" />
    : shouldRedirect === 2
      ? <Redirect to="/signup" />
      : (
        <>
          <CssBaseline />
          <AppBar position="relative">
            <Toolbar>
              <img src={logo} alt="Logo" className={classes.icon} />
              <Typography variant="h6" color="inherit" noWrap>
                فایل مارکت
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                  فایل مارکت
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                  بستری امن و کاربردی و در دسترس برای دارندگان محصولات مجازی و
                  راحتی در پیداکردن محصول مورد نیاز و امنیت در خرید برای خریدارن
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShouldRedirect(2)}
                      >
                        ثبت نام
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShouldRedirect(1)}
                      >
                        ورود
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </div>
            <FileList />
          </main>
          <footer className={classes.footer}>
            <Typography variant="subtitle2" align="center" color="textSecondary" component="p">
              حقوق سایت و تمامی محصولات برای توسعه دهندگان محفوظ می باشد.
              استفاده از خدمات به منزله پذیرش قوانین ما می باشد.
            </Typography>
            <Copyright />
          </footer>
        </>
      );
};

export default Landing;
