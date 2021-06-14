import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  List,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(1),
  },
}));

const RequestList = () => {
  const classes = useStyles();
  const [requestList, setRequestList] = useState([]);
  const [confirmModalInfo, setConfirmModalInfo] = useState({
    itemID: '',
    itemStatus: '',
    open: false,
  });

  useEffect(() => {
    const getAllPurchaseRequests = async () => {
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
        // maybe return a snackbar to
        // say "unable to load the list"
          console.error(error);
        });
    };
    getAllPurchaseRequests();
  }, []);

  return (
    <>
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
                  requestList.map(value => (
                    <div key={value.itemKey}>
                      <RequestItem
                        itemKey={value.itemKey}
                        name={value.name}
                        phoneNumber={value.phoneNumber}
                        requestType={value.requestType}
                        setModalOpen={setConfirmModalInfo}
                      />
                    </div>
                  ))
                }
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <ConfirmationDialog
        title="Are you sure you want to save changes?"
        subTitle="You can not change it later"
        modalOpen={confirmModalInfo}
        setModalOpen={setConfirmModalInfo}
        onYesButtonClick={updateRequestStatus}
      />
    </>
  );
};

export default RequestList;
