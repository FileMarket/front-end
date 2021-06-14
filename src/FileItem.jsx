import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DetailsIcon from '@material-ui/icons/Details';
import image from './image/file_transfer.jpg';

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const FileItem = (props) => {
  const {
    itemKey,
    fileName,
    price,
    setModalOpen,
  } = props;
  const classes = useStyles();

  const detailModalOpenHandler = () => setModalOpen({ id: itemKey, open: true });

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={image}
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {fileName}
        </Typography>
        <Typography>
          {`قیمت : ${price}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          size="small"
          endIcon={<DetailsIcon />}
          onClick={detailModalOpenHandler}
        >
          مشاهده جزییات و خرید
        </Button>
      </CardActions>
    </Card>
  );
};

FileItem.propTypes = {
  itemKey: PropTypes.number.isRequired,
  fileName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default FileItem;
