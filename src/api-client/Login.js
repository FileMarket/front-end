/* eslint-disable no-console */
import { API_LOGIN } from '../apiConstants';

const login = async (values) => {
  fetch(`${API_LOGIN}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values, 2, 0),
  })
    .then(response => response.json())
    .then((responseJson) => {
      if (responseJson.code === 200) {
        localStorage.setItem('token', responseJson.token);
        console.log('Login Successfully');
      } else {
        console.log('Fail');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export default login;
