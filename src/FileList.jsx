import React, {
  useState,
  useEffect,
} from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FileItem from './FileItem';
import SnackbarAlert from './Snackbar';
import DetailDialog from './DetailDialog';
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
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [detailModal, setDetailModal] = useState({
    open: false,
    isBought: false,
    fileDetail: {},
  });

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
        .catch(() => setSnackbarInfo({
          open: true,
          message: 'در ارتباط با سرور خطایی رخ داده است. لطفاً مجدداً تلاش کنید',
          severity: 'error',
        }));
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
                setModalOpen={setDetailModal}
                setSnackbarInfo={setSnackbarInfo}
              />
            </Grid>
          ))
        }
      </Grid>
      <SnackbarAlert
        open={snackbarInfo.open}
        setOpen={e => setSnackbarInfo({ message: '', severity: 'success', open: e })}
        message={snackbarInfo.message}
        severity={snackbarInfo.severity}
      />
      <DetailDialog
        fileDetail={detailModal.fileDetail}
        open={detailModal.open}
        setOpen={setDetailModal}
        isBought={detailModal.isBought}
        setSnackbarInfo={setSnackbarInfo}
      />
    </Container>
  );
};

export default FormList;
