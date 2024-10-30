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

export const filterOutManagers = <T extends any[]>(data: T) => {
  return data.filter(fil => fil.role.id === 1);
};

export const regexAllowTypeNumber = /^[0-9]*$/;
export const isEmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const validateEmail = (email: string) => {
  return String(email).toLowerCase().match(isEmailRegex);
};
