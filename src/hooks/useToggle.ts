import { useState } from 'react';

export default function useToggle() {
  const [show, setShow] = useState<boolean>(false);

  const handleToggle = () => {
    setShow(prevShow => !prevShow);
  };

  return {
    show,
    handleToggle,
  };
}
