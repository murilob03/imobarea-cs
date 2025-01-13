import React, { useState } from "react";

interface SmallButtonProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Função opcional de clique
}

const SmallButton: React.FC<SmallButtonProps> = ({ text, onClick }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsSelected((prev) => !prev); // Alterna o estado de seleção
    if (onClick) onClick(event); // Chama a função onClick, se existir
  };

  const commonClasses = `flex justify-center items-center text-[12px] rounded-full transition-all duration-300
    ${isSelected ? "bg-marrom text-white" : "bg-transparent text-black border border-black"}`;

  return (
    <button
      className={`${commonClasses} w-[108.67px] h-[45px]`}
      onClick={handleButtonClick}
    >
      {text}
    </button>
  );
};

export default SmallButton;
