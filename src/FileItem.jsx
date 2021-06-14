import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  FormGroup,
  FormControlLabel,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core';

const RequestItem = (props) => {
  const {
    itemKey,
    name,
    phoneNumber,
    requestType,
    setModalOpen,
  } = props;

  const modalOpenHandler = () => setModalOpen(true);

  return (
    <ListItem key={itemKey} dense>
      <ListItemAvatar>
        <Avatar>
          {requestType}
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={name}
        secondary={phoneNumber}
      />

      <ListItemIcon>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="top"
            control={(
              <Button
                color="primary"
                onClick={modalOpenHandler}
              >
                موفقیت
              </Button>
            )}
          />
          <FormControlLabel
            value="top"
            control={(
              <Button
                color="primary"
                onClick={modalOpenHandler}
              >
                شکست
              </Button>
            )}
          />
        </FormGroup>
      </ListItemIcon>
    </ListItem>
  );
};

RequestItem.propTypes = {
  itemKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  requestType: PropTypes.string.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default RequestItem;
