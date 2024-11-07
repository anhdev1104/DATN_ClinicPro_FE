import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import unidecode from 'unidecode';
import { emailRegex } from './regex';

export const cn = (...input: ClassValue[]) => {
  return twMerge(clsx(input));
};

export const convertStringToASCII = (value: string) => {
  return unidecode(value).toLowerCase();
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
  return data.filter(fil => fil.role.name === 'doctor');
};

export const validateEmail = (email: string) => {
  return String(email).toLowerCase().match(emailRegex);
};
