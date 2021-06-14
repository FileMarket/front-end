/* eslint-disable no-console */
import { API_SIGNUP } from '../apiConstants';

const signup = async (values) => {
  fetch(`${API_SIGNUP}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values, 2, 0),
  })
    .then(response => response.json())
    .then((responseJson) => {
      if (responseJson.code === 200) {
        console.log('Created Successfully');
      } else {
        console.log('Fail');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export default signup;
