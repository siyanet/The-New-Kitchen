import { useEffect } from 'react';

const useDisableScroll = (isDisabled) => {
  useEffect(() => {
    if (isDisabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to reset scroll when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isDisabled]);
};

export default useDisableScroll;
