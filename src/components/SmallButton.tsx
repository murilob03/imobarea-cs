import React, { useState } from 'react'

interface SmallButtonProps {
  text: string
  onClick?: React.MouseEventHandler<HTMLButtonElement> // Função opcional de clique
  isSelected?: boolean // Propriedade opcional para definir o estado inicial do botão
}

const SmallButton: React.FC<SmallButtonProps> = ({
  text,
  onClick,
  isSelected = false,
}) => {
  const [internalSelected, setInternalSelected] = useState(isSelected) // Inicializa com o valor de isSelected

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setInternalSelected((prev) => !prev) // Alterna o estado de seleção
    if (onClick) onClick(event) // Chama a função onClick, se existir
  }

  const commonClasses = `flex justify-center items-center text-xs rounded-full transition-all duration-300 
    ${
      internalSelected
        ? 'bg-marrom text-white'
        : 'bg-transparent text-black border border-black'
    }`

  return (
    <button
      className={`${commonClasses} w-[108.67px] h-[45px]`}
      onClick={handleButtonClick}
      name={text}
    >
      {text}
    </button>
  )
}

export default SmallButton
