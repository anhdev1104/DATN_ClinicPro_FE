const convertTime = (time: string, notTime?: boolean) => {
  const newTime = new Date(time);

  if (notTime) {
    const day = String(newTime.getDate()).padStart(2, '0');
    const month = String(newTime.getMonth() + 1).padStart(2, '0');
    const year = newTime.getFullYear();

    return `${day}/${month}/${year}`;
  } else {
    const vietnamOffset = 7 * 60;
    const localTime = new Date(newTime.getTime() + vietnamOffset * 60 * 1000);

    const day = String(localTime.getDate()).padStart(2, '0');
    const month = String(localTime.getMonth() + 1).padStart(2, '0');
    const year = localTime.getFullYear();
    const hours = String(localTime.getHours()).padStart(2, '0');
    const minutes = String(localTime.getMinutes()).padStart(2, '0');
    const seconds = String(localTime.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  }
};

export default convertTime;
