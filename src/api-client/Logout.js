import { API_LOGOUT } from '../apiConstants';

const logout = async (setSnackbarInfo) => {
  fetch(`${API_LOGOUT}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: localStorage.getItem('token') }, 2, 0),
  })
    .then(response => response.json())
    .then((responseJson) => {
      if (responseJson.code === 200) {
        localStorage.removeItem('token');
        setSnackbarInfo({
          open: true,
          message: 'با موفقیت خارج شدید',
          severity: 'success',
        });
      } else {
        setSnackbarInfo({
          open: true,
          message: 'در خارج شدن از سامانه مشکلی به وجود آمده است. لطفاً مجدداً تلاش کنید',
          severity: 'error',
        });
      }
    })
    .catch(() => {
      setSnackbarInfo({
        open: true,
        message: 'در خارج شدن از سامانه مشکلی به وجود آمده است. لطفاً مجدداً تلاش کنید',
        severity: 'error',
      });
    });
};

export default logout;
