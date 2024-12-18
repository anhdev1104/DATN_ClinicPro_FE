const SortArrayToTimeStamp = (data: any[]) => {
  const newArr = data.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return newArr;
};

export default SortArrayToTimeStamp;
