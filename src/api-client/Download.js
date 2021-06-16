import { API_DOWNLOAD_FILE } from '../apiConstants';

const download = async (file_id, setSnackbarInfo) => {
  fetch(`${API_DOWNLOAD_FILE}?token=${localStorage.token}&file_id=${file_id}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then((responseJson) => {
      if (responseJson.code === 200) {
        setSnackbarInfo({
          open: true,
          message: 'فایل با موفقیت دانلود شد',
          severity: 'success',
        });
      } else {
        setSnackbarInfo({
          open: true,
          message: 'در بارگیری فایل خطایی رخ داده است. لطفاً مجدداً تلاش کنید',
          severity: 'error',
        });
      }
    })
    .catch(() => {
      setSnackbarInfo({
        open: true,
        message: 'در ارتباط با سرور خطایی رخ داده است. لطفاً مجدداً تلاش کنید',
        severity: 'error',
      });
    });
};

export default download;
