/* eslint-disable no-console */
import { API_LOGOUT } from '../apiConstants';

const logout = async () => {
  fetch(`${API_LOGOUT}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: localStorage.getItem('token') }, 2, 0),
  })
    .then(response => response.json())
    .then((responseJson) => {
      if (responseJson.code === 200) {
        localStorage.removeItem('token');
        console.log('Logout Successfully');
      } else {
        console.log('Fail');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export default logout;
