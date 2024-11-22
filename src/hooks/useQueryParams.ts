import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SearchParams<T> {
  get: (key: keyof T) => string;
  getAll: () => T;
  set: (key: keyof T, value: string) => void;
  remove: (key: keyof T) => void;
  removeAll: () => void;
  has: (key: keyof T) => boolean;
}
export const useQueryParams = <T extends { [k in keyof QueryParams]: any }>(): [T, SearchParams<T>] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsRef = useRef({} as T);
  const getQueryParam = (key: keyof T) => searchParams.get(key as string) || '';

  const getAllQueryParam = () => Object.fromEntries(searchParams) as T;

  const setQueryParam = (key: keyof T, value: string) => {
    searchParams.set(key.toString(), value);
    setSearchParams(searchParams.toString());
  };

  const removeQueryParam = (key: keyof T) => {
    searchParams.delete(key.toString());
    setSearchParams(searchParams.toString());
  };

  const removeAllQueryParam = () => setSearchParams('');

  const hasQueryParams = (key: keyof T) => searchParams.has(key as string);

  useEffect(() => {
    if (searchParams.toString()) {
      searchParams.forEach((value, key) => value === '' && searchParams.delete(key));
      paramsRef.current = getAllQueryParam();
      setSearchParams(searchParams.toString());
    }
  }, [searchParams]);

  return [
    paramsRef.current,
    {
      get: getQueryParam,
      getAll: getAllQueryParam,
      set: setQueryParam,
      remove: removeQueryParam,
      removeAll: removeAllQueryParam,
      has: hasQueryParams,
    },
  ];
};
