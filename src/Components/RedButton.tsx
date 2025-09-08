import React from "react";

interface RedButtonProps {
  onClick?: () => void;
  word: string;
}

const RedButton: React.FC<RedButtonProps> = ({ onClick, word }) => {
  return (
    <button onClick={onClick} className="p-4 text-white bg-red">
      {word}
    </button>
  );
};

export default RedButton;

