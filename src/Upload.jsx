/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import uploadFile from './api-client/Upload';
import { API_GET_ALL_CATEGORY } from './apiConstants';

const useStyles = makeStyles(theme => ({
  previewChip: {
    minWidth: 160,
    maxWidth: 210,
  },
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
    .string('نام فایل را وارد کنید')
    .matches(/[a-zA-Z0-9]+/, 'نام فایل وارد شده نامعتبر است')
    .required('وارد کردن نام فایل الزامی است'),
  description: yup
    .string('توضیحات خود درباره فایل را وارد کنید')
    .matches(/[a-zA-Z0-9]+/, 'توضیحات وارد شده نامعتبر است'),
  price: yup
    .string('قیمت را وارد کنید')
    .matches(/[0-9]+/, 'قیمت وارد شده نامعتبر است')
    .required('وارد کردن قیمت الزامی است'),
  subcategory_id: yup
    .string('یک دسته بندی برای فایل انتخاب کنید')
    .required('انتخاب دسته بندی فایل الزامی است'),
  size: yup
    .string('یک فایل برای بارگذاری در سامانه انتخاب کنید')
    .required('انتخاب فایل الزامی است'),
});

const Upload = () => {
  const classes = useStyles();
  const data = new FormData();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchMyAPI = async () => {
      await fetch(`${API_GET_ALL_CATEGORY}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then((responseJson) => {
          const subCategoryItems = Object.keys(responseJson)
            .flatMap(key => responseJson[key]);
          setCategory(subCategoryItems);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchMyAPI();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      format: '',
      size: '',
      token: '',
      subcategory_id: '',
      file: null,
    },
    validationSchema,
    onSubmit: (values) => {
      data.append('name', values.name);
      data.append('description', values.description);
      data.append('price', values.price);
      data.append('format', values.format);
      data.append('size', values.size);
      data.append('token', values.token);
      data.append('subcategory_id', values.subcategory_id);
      data.append('file', values.file);
      uploadFile(data);
    },
  });

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={8}>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                autoComplete="off"
                error={
                  !!formik.errors.name
                  && formik.touched.name
                  && Boolean(formik.errors.name)
                }
                fullWidth
                helperText={
                  !!formik.errors.name
                  && formik.touched.name
                  && formik.errors.name
                }
                id="file-name-input"
                label="نام فایل"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                autoComplete="off"
                error={
                  !!formik.errors.description
                  && formik.touched.description
                  && Boolean(formik.errors.description)
                }
                fullWidth
                helperText={
                  !!formik.errors.description
                  && formik.touched.description
                  && formik.errors.description
                }
                id="fileDescription-input"
                label="توضیحات فایل"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                select
                autoComplete="off"
                id="subcategory_id"
                name="subcategory_id"
                label="دسته بندی فایل"
                value={formik.values.subcategory_id}
                onChange={formik.handleChange}
                error={
                  !!formik.errors.subcategory_id
                  && formik.touched.subcategory_id
                  && Boolean(formik.errors.subcategory_id)
                }
                helperText={
                  !!formik.errors.subcategory_id
                  && formik.touched.subcategory_id
                  && formik.errors.subcategory_id
                }
              >
                {
                  category.map(value => (
                    <MenuItem
                      key={value.id}
                      value={value.id}
                    >
                      {value.subcategory}
                    </MenuItem>
                  ))
                }
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                autoComplete="off"
                error={
                  !!formik.errors.price
                  && formik.touched.price
                  && Boolean(formik.errors.price)
                }
                fullWidth
                helperText={
                  !!formik.errors.price
                  && formik.touched.price
                  && formik.errors.price
                }
                id="filePrice-input"
                label="قیمت فایل"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <DropzoneArea
                name="file"
                onChange={(event) => {
                  if (event.length !== 0) {
                    formik.setFieldValue('file', event[0]);
                    formik.setFieldValue('size', event[0].size);
                    formik.setFieldValue('format', event[0].type);
                    formik.setFieldValue('token', localStorage.getItem('token'));
                  } else {
                    formik.setFieldValue('file', null);
                    formik.setFieldValue('size', '');
                    formik.setFieldValue('format', '');
                    formik.setFieldValue('token', '');
                  }
                }}
                showPreviews
                showAlerts
                filesLimit={1}
                showPreviewsInDropzone={false}
                useChipsForPreview
                previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
                previewChipProps={{ classes: { root: classes.previewChip } }}
                dropzoneText="یک فایل را در اینجا بکشید و رها کنید یا کلیک کنید"
                previewText="فایل انتخاب شده"
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
              بارگذاری
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Upload;
