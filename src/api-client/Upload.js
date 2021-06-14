/* eslint-disable no-console */
import { API_FILE_UPLOAD } from '../apiConstants';

const uploadFile = async (values) => {
  fetch(`${API_FILE_UPLOAD}`, {
    method: 'post',
    body: values,
  })
    .then(response => response.json())
    .then((responseJson) => {
      if (responseJson.code === 200) {
        console.log('Upload Successfully');
      } else {
        console.log('Fail');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export default uploadFile;
