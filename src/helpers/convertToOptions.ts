const convertToOptions = (data: any) => {
  return (
    data.length > 0 &&
    data.map(({ id, name }: { id: number; name: string }) => ({
      value: id,
      label: name,
    }))
  );
};

export default convertToOptions;
