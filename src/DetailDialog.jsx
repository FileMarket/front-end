import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const DetailDialogBody = (props) => {
  const {
    title,
    subTitle,
    setModalOpen,
    onYesButtonClick,
  } = props;

  const handleYesButtonClick = () => {
    onYesButtonClick();
    setModalOpen(false);
  };

  return (
    <div>
      <DialogTitle id="alert-dialog-slide-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {subTitle}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          color="primary"
          onClick={() => setModalOpen(false)}
        >
          خیر
        </Button>

        <Button
          onClick={handleYesButtonClick}
          color="primary"
          autoFocus
        >
          بله
        </Button>
      </DialogActions>
    </div>
  );
};

const DetailDialog = (props) => {
  const {
    title,
    subTitle,
    modalOpen,
    setModalOpen,
    onYesButtonClick,
  } = props;

  return (
    <Dialog
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DetailDialogBody
        title={title}
        subTitle={subTitle}
        setModalOpen={setModalOpen}
        onYesButtonClick={onYesButtonClick}
      />
    </Dialog>
  );
};

DetailDialogBody.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  onYesButtonClick: PropTypes.func.isRequired,
};

DetailDialog.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  onYesButtonClick: PropTypes.func.isRequired,
};

export default DetailDialog;
