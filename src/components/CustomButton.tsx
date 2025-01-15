import React from 'react'

interface CustomButtonProps {
  href?: string
  text: string
  onClick?: React.MouseEventHandler<HTMLButtonElement> // Tipo para a função de clique
  type?: 'button' | 'submit' | 'reset' // Tipos possíveis para o botão
}

const CustomButton: React.FC<CustomButtonProps> = ({
  href,
  text,
  onClick,
  type = 'button',
}) => {
  const commonClasses =
    'flex justify-center items-center gap-2.5 self-stretch p-[26px_32px] bg-marrom rounded-full font-bold text-white'

  if (href) {
    return (
      <a className={commonClasses} href={href}>
        {text}
      </a>
    )
  }

  return (
    <button className={commonClasses} type={type} onClick={onClick}>
      {text}
    </button>
  )
}

export default CustomButton
