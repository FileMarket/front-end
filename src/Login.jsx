import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Container,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SnackbarAlert from './Snackbar';
import login from './api-client/Login';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(5, 0, 1),
  },
}));

const validationSchema = yup.object({
  email: yup
    .string('آدرس ایمیل خود را وارد کنید')
    .email('آدرس ایمیل وارد شده نامعتبر است')
    .required('وارد کردن آدرس ایمیل الزامی است'),
  password: yup
    .string('رمز عبور خود را وارد کنید')
    .required('وارد کردن رمز عبور الزامی است'),
});

const Login = () => {
  const classes = useStyles();
  const [check, setCheck] = useState(Boolean(localStorage.checkbox));
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const formik = useFormik({
    initialValues: {
      email: check ? localStorage.getItem('email') : '',
      password: check ? localStorage.getItem('password') : '',
    },
    validationSchema,
    onSubmit: (values) => {
      localStorage.email = formik.values.email;
      localStorage.password = formik.values.password;
      login(values, setSnackbarInfo);
    },
  });

  const onCheckBoxClickHandler = () => {
    if (!check) {
      localStorage.email = formik.values.email;
      localStorage.password = formik.values.password;
      localStorage.checkbox = !check;
    } else {
      localStorage.clear();
      formik.setFieldValue('email', '');
      formik.setFieldValue('password', '');
    }
    setCheck(!check);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={8}>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                autoComplete="true"
                error={
                  !!formik.errors.email
                  && formik.touched.email
                  && Boolean(formik.errors.email)
                }
                fullWidth
                helperText={
                  !!formik.errors.email
                  && formik.touched.email
                  && formik.errors.email
                }
                id="email-input-login"
                label="آدرس ایمیل"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                error={
                  !!formik.errors.password
                  && formik.touched.password
                  && Boolean(formik.errors.password)
                }
                fullWidth
                helperText={
                  !!formik.errors.password
                  && formik.touched.password
                  && formik.errors.password
                }
                id="password-input-login"
                label="رمز عبور"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={check}
                  value="termsAndConditions"
                  onChange={onCheckBoxClickHandler}
                  color="primary"
                />
              )}
              label="این نشست را به خاطر بسپار"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              ورود
            </Button>
          </Grid>
        </form>
        <SnackbarAlert
          open={snackbarInfo.open}
          setOpen={e => setSnackbarInfo({ message: '', severity: 'success', open: e })}
          message={snackbarInfo.message}
          severity={snackbarInfo.severity}
        />
      </Paper>
    </Container>
  );
};

export default Login;
