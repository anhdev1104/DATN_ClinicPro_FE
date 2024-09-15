import scrollToTopUtils from '@/helpers/scrollToTopUtils';
import { useState, useEffect } from 'react';
import { KeyboardArrowUpIcon } from '../icons';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTopUtils}
          className="fixed bottom-[50px] right-[50px] w-14 h-14 bg-white shadow-xl flex justify-center items-center rounded-full cursor-pointer z-10"
        >
          <KeyboardArrowUpIcon className="text-primary" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
