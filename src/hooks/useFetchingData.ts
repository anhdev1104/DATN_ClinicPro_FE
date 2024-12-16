import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface IUseFetchingDataProps<T> {
  serviceFetching: () => Promise<T>;
  initialData?: T;
}

export default function useFetchingData<T>({ serviceFetching, initialData }: IUseFetchingDataProps<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | []>(initialData || []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const result = await serviceFetching();
        setData(result);
      } catch (err) {
        const error = err as AxiosError;
        setError(error.message || 'Có gì đó không ổn !');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [serviceFetching]);

  return {
    isLoading,
    error,
    data,
    setData,
  };
}
