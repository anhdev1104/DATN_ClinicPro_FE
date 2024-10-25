import { useState } from 'react';

export default function useToggle() {
  const [show, setShow] = useState<boolean>(false);

  const handleToggle = () => {
    setShow(prevShow => !prevShow);
  };

  return {
    show,
    handleToggle
  };
}
// import { useState } from 'react';

// export default function useToggle() {
//   const [selectedId, setSelectedId] = useState<number | null>(null);

//   const handleToggle = (id: number) => {
//     setSelectedId(prevId => (prevId === id ? null : id));
//   };

//   const isOpen = (id: number) => selectedId === id;

//   return {
//     selectedId,
//     handleToggle,
//     isOpen
//   };
// }
