import { API_BUY_FILE } from '../apiConstants';

const buy = async (values, setSnackbarInfo) => {
  fetch(`${API_BUY_FILE}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values, 2, 0),
  })
    .then(response => response.json())
    .then((responseJson) => {
      if (responseJson.code === 200) {
        setSnackbarInfo({
          open: true,
          message: 'فایل مورد نظر با موفقیت خریداری شد',
          severity: 'success',
        });
        return true;
      }
      setSnackbarInfo({
        open: true,
        message: 'موجودی کیف پول شما کافی نیست',
        severity: 'error',
      });
      return false;
    })
    .catch(() => {
      setSnackbarInfo({
        open: true,
        message: 'در ارتباط با سرور خطایی رخ داده است. لطفاً مجدداً تلاش کنید',
        severity: 'error',
      });
      return false;
    });
};

export default buy;
