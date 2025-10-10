import { useEffect, useState } from "react";

const FreeTierNotice: React.FC = () => {
  const [showNotice, setShowNotice] = useState<boolean>(true);

  useEffect(() => {
    // Hide the notice after 5 seconds
    const timer = setTimeout(() => {
      setShowNotice(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!showNotice) return null;

  return (
    <div className="fixed top-0 left-0 z-50 w-full px-4 py-2 text-center text-black bg-yellow-400 shadow-md animate-slideDown">
      <p className="text-sm font-medium md:text-base">
        Note: The system may take a few seconds to load on first visit due to Render’s free-tier idle start. Thank you for your patience!
      </p>
    </div>
  );
};

export default FreeTierNotice;
