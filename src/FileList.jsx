import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FileItem from './FileItem';
import SnackbarAlert from './Snackbar';
import { API_GET_ALL_FILES } from './apiConstants';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const FormList = () => {
  const classes = useStyles();
  const [allFileItem, setAllFileItem] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [detailModal, setDetailModal] = useState({
  //   itemID: '',
  //   open: false,
  // });

  useEffect(() => {
    const getAllFileItems = async () => {
      await fetch(`${API_GET_ALL_FILES}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then((responseJson) => {
          const fileItem = Object.keys(responseJson)
            .flatMap(key => responseJson[key]);
          setAllFileItem(fileItem);
        })
        .catch(() => setSnackbarOpen(true));
    };
    getAllFileItems();
  }, []);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {
          allFileItem.map(value => (
            <Grid item key={value.id} xs={12} sm={6} md={4}>
              <FileItem
                itemKey={value.id}
                fileName={value.name}
                price={value.price}
                setModalOpen={() => null}
              />
            </Grid>
          ))
        }
      </Grid>
      <SnackbarAlert
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message="در بارگیری لیست فایل‌های موجود اشکالی رخ داده است"
        severity="error"
      />
    </Container>
  );
};

export default FormList;
