import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  List,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FileItem from './FileItem';
import SnackbarAlert from './Snackbar';
import { API_GET_ALL_FILES } from './apiConstants';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(1),
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
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={8}>
        <Grid
          container
          alignItems="center"
          justify="center"
          spacing={4}
        >
          <Grid item xs={12}>
            <List>
              {
                allFileItem.map(value => (
                  <div key={value.id}>
                    <FileItem
                      itemKey={value.id}
                      fileName={value.name}
                      price={value.price}
                      setModalOpen={() => null}
                    />
                  </div>
                ))
              }
            </List>
          </Grid>
        </Grid>
        <SnackbarAlert
          open={snackbarOpen}
          setOpen={setSnackbarOpen}
          message="در بارگیری لیست فایل‌های موجود اشکالی رخ داده است"
          severity="error"
        />
      </Paper>
    </Container>
  );
};

export default FormList;
