export default function renderMessageError(err: string | any) {
  if (typeof err === 'string') {
    return err;
  } else {
    return err[Object.keys(err)[0]]?.[0];
  }
}
