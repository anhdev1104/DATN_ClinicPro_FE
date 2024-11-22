const convertLightBox = (images: any[]): any => {
  if (!Array.isArray(images)) return [];
  return images.filter(item => item.file).map(item => item.file);
};

export default convertLightBox;
