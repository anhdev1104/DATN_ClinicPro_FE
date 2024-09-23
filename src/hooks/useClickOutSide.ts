import { useEffect, useRef, useState } from 'react';

export default function useClickOutSide() {
  const [show, setShow] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutSide(e: MouseEvent) {
      if (nodeRef.current && !nodeRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    }

    document.addEventListener('click', handleClickOutSide);
    return () => document.removeEventListener('click', handleClickOutSide);
  }, []);

  return { show, setShow, nodeRef };
}
