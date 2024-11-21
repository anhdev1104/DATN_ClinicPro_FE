const convertTime = (time: string, notTime?: boolean) => {
  const newTime = new Date(time);
  let options: any;
  if (notTime) {
    options = {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
  } else {
    const vietnamOffset = 7 * 60;
    const localTime = new Date(newTime.getTime() + vietnamOffset * 60 * 1000);
    const formattedTime = localTime.toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour12: false,
    });
    options = formattedTime;
  }
  const localDateString = newTime.toLocaleString('vi-VN', options);
  return localDateString;
};

export default convertTime;
