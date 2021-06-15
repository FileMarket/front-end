import { API_DOWNLOAD_FILE } from '../apiConstants';

const download = async (file_id, setSnackbarInfo, navigate) => {
  fetch(`${API_DOWNLOAD_FILE}?token=${localStorage.token}&file_id=${file_id}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then((responseJson) => {
      if (responseJson.code === 200) {
        setSnackbarInfo({
          open: true,
          message: 'با موفقیت وارد شدید',
          severity: 'success',
        });
        navigate('/');
      } else {
        setSnackbarInfo({
          open: true,
          message: 'رمز عبور یا ایمیل وارد شده اشتباه است',
          severity: 'error',
        });
      }
    })
    .catch(() => {
      setSnackbarInfo({
        open: true,
        message: 'در وارد شدن به سامانه مشکلی به وجود آمده است. لطفاً مجدداً تلاش کنید',
        severity: 'error',
      });
    });
};

export default download;
