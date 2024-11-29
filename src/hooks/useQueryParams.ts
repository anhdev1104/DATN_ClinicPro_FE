import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SearchParams<T> {
  get: (key: keyof T) => string;
  getAll: () => T;
  set: (key: keyof T, value: string | number) => void;
  remove: (key: keyof T) => void;
  removeAll: () => void;
  has: (key: keyof T) => boolean;
}
export const useQueryParams = <T extends { [k in keyof QueryParams]: any }>(): [T, SearchParams<T>] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsRef = useRef({} as T);
  const getQueryParam = (key: keyof T) => searchParams.get(key.toString()) || '';

  const getAllQueryParam = () => Object.fromEntries(searchParams.entries()) as T;

  const setQueryParam = (key: keyof T | Array<keyof T>, value: string | number) => {
    searchParams.set(key.toString(), value.toString());
    setSearchParams(searchParams.toString());
  };

  const removeQueryParam = (key: keyof T) => {
    searchParams.delete(key.toString());
    setSearchParams(searchParams.toString());
  };

  const removeAllQueryParam = () => setSearchParams('');

  const hasQueryParams = (key: keyof T) => searchParams.has(key.toString());

  useEffect(() => {
    paramsRef.current = getAllQueryParam();
    setSearchParams(searchParams.toString());
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
