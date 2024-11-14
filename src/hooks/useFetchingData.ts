import { useEffect, useState } from 'react';

interface IUseFetchingDataProps<IData> {
  serviceFetching: () => Promise<IData>;
  initialData?: IData;
}

export default function useFetchingData<IData>({ serviceFetching, initialData }: IUseFetchingDataProps<IData>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<IData | []>(initialData || []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const result = await serviceFetching();
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Có gì đó không ổn !');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [serviceFetching]);

  return {
    isLoading,
    error,
    data,
  };
}
