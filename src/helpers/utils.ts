import { emailRegex } from '@/constants/regex';
import { clsx, type ClassValue } from 'clsx';
import { UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import unidecode from 'unidecode';

export const cn = (...input: ClassValue[]) => {
  return twMerge(clsx(input));
};

export const convertStringToASCII = (value: string) => {
  return unidecode(value).toLowerCase();
};

interface queryKey {
  [key: string]: any;
}

export const formatEndPoint = (endPoint: string, queryKey?: queryKey | void) => {
  if (queryKey) {
    const query = Object.keys(queryKey)
      .filter(key => queryKey[key] && queryKey[key])
      .map(key => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(queryKey[key])}`;
      })
      .join('&');
    return `${endPoint}?${query}`;
  }
  return endPoint;
};
export const filterOutManagers = <T extends any[]>(data: T) => {
  return data.filter(fil => fil.role.name === 'doctor');
};

export const validateEmail = (email: string) => {
  return String(email).toLowerCase().match(emailRegex);
};

export interface ErrorResponse {
  errors: { [key: string]: any };
  message: string;
}

export const resolveErrorResponse = (errorResolve: ErrorResponse, setError: UseFormSetError<any>) => {
  const { errors, message } = errorResolve;
  if (message) toast.error(message);
  const errorName = Object.keys(errors) as Array<keyof typeof errors>;
  setError(errorName[0] as string, { message: errors[errorName[0]][0] });
};
