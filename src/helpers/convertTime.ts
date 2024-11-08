const convertTime = (time: string) => {
  const newTime = new Date(time);

  const localDateString = newTime.toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return localDateString;
};

export default convertTime;
