import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FormGroup,
  FormControlLabel,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import DetailsIcon from '@material-ui/icons/Details';

const FileItem = (props) => {
  const {
    itemKey,
    fileName,
    price,
    setModalOpen,
  } = props;

  const detailModalOpenHandler = () => setModalOpen({ id: itemKey, open: true });

  return (
    <ListItem key={itemKey} dense>
      <ListItemText
        primary={fileName}
        secondary={`قیمت : ${price}`}
      />
      <ListItemIcon>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="top"
            control={(
              <Button
                color="primary"
                endIcon={<DetailsIcon />}
                onClick={detailModalOpenHandler}
              >
                مشاهده جزییات و خرید
              </Button>
            )}
          />
        </FormGroup>
      </ListItemIcon>
    </ListItem>
  );
};

FileItem.propTypes = {
  itemKey: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default FileItem;
