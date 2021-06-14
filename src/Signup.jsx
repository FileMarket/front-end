import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import signup from './api-client/Signup';

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
  name: yup
    .string('نام خود را وارد کنید')
    .matches(/[a-zA-Z0-9]+/, 'نام وارد شده نامعتبر است')
    .required('وارد کردن نام الزامی است'),
  family: yup
    .string('نام خانوادگی خود را وارد کنید')
    .matches(/[a-zA-Z]+/, 'نام خانوادگی وارد شده نامعتبر است')
    .required('وارد کردن نام خانوادگی الزامی است'),
  email: yup
    .string('آدرس ایمیل خود را وارد کنید')
    .email('آدرس ایمیل نامعتبر است')
    .required('وارد کردن آدرس ایمیل الزامی است'),
  password: yup
    .string('رمز عبور خود را وارد کنید')
    .required('وارد کردن رمز عبور الزامی است')
    .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد'),
  phone: yup
    .string('شماره تلفن همراه خود را وارد کنید')
    .required('وارد کردن شماره تلفن همراه الزامی است')
    .matches(/09[0-9]{9}/, 'شماره تلفن همراه وارد شده نامعتبر است')
    .max(11, 'شماره تلفن همراه باید ۱۱ رقم باشد'),
});

const Signup = () => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: '',
      family: '',
      email: '',
      password: '',
      phone: '',
    },
    validationSchema,
    onSubmit: (values) => {
      signup(values);
    },
  });

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={8}>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                error={formik.touched.name && Boolean(formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                id="name-input"
                label="نام"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                error={formik.touched.family && Boolean(formik.errors.family)}
                fullWidth
                helperText={formik.touched.family && formik.errors.family}
                id="family-input"
                label="نام خانوادگی"
                name="family"
                value={formik.values.family}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="true"
                error={formik.touched.email && Boolean(formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                id="email-input"
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
                error={formik.touched.password && Boolean(formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                id="password-input"
                label="رمز عبور"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                id="phone-input"
                label="شماره تلفن همراه"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              ثبت نام
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
