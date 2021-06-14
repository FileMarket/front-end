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
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  const onCheckBoxClickHandler = () => {
    if (!check && formik.values.email !== '' && formik.values.password) {
      localStorage.email = formik.values.email;
      localStorage.password = formik.values.password;
      localStorage.checkbox = !check;
    } else {
      localStorage.email = '';
      localStorage.password = '';
      localStorage.checkbox = '';
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
                error={formik.touched.email && Boolean(formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                id="email-input-login"
                label="آدرس ایمیل"
                name="email"
                value={localStorage.checkbox ? localStorage.email : formik.values.email}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                error={formik.touched.password && Boolean(formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                id="password-input-login"
                label="رمز عبور"
                name="password"
                type="password"
                value={localStorage.checkbox ? localStorage.password : formik.values.password}
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
      </Paper>
    </Container>
  );
};

export default Login;
