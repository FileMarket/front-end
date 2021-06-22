import { API_BUY_FILE } from '../apiConstants';

const buy = async (values, setSnackbarInfo) => {
  await fetch(`${API_BUY_FILE}`, {
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
        localStorage.setItem('buyRes', true);
      }
      setSnackbarInfo({
        open: true,
        message: 'موجودی کیف پول شما کافی نیست',
        severity: 'error',
      });
      localStorage.setItem('buyRes', false);
    })
    .catch(() => {
      setSnackbarInfo({
        open: true,
        message: 'در ارتباط با سرور خطایی رخ داده است. لطفاً مجدداً تلاش کنید',
        severity: 'error',
      });
      localStorage.setItem('buyRes', false);
    });
};

export default buy;
