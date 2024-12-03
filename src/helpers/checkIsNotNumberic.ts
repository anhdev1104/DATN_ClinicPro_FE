import { ChangeEvent } from 'react';

export default function checkIsNotNumberic(e: ChangeEvent<HTMLInputElement>) {
  if (isNaN(+e.target.value)) {
    return true;
  } else {
    return false;
  }
}
