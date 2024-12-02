function convertGender(gender: string): string {
  const genderMap: { [key: string]: string } = {
    male: 'Nam',
    female: 'Nữ',
    other: 'Khác',
  };

  return genderMap[gender];
}

export default convertGender;
