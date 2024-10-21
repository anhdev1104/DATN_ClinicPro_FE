import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import unidecode from 'unidecode';

export const cn = (...input: ClassValue[]) => {
  return twMerge(clsx(input));
};

export const convertStringToASCII = (value: string) => {
  return unidecode(value).toLowerCase();
};

export const isObject = (variable: unknown) => {
  return typeof variable === 'object' && variable instanceof Object && variable !== null && !Array.isArray(variable);
};

interface queryKey {
  [key: string]: any;
}

export const formatQueryParam = (endPoint: string, queryKey: queryKey) => {
  const query = Object.keys(queryKey)
    .filter(key => queryKey[key] && queryKey[key])
    .map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(queryKey[key])}`;
    })
    .join('&');
  return query ? `${endPoint}?${query}` : endPoint;
};

export const filterOutManagers = (data: Array<any>) => {
  return data.filter(fil => fil.role.id === 1);
};
