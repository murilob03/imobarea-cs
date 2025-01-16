import React from 'react';
import { LuCirclePlus } from "react-icons/lu"; // Importando o ícone de "+" 

interface ImageFieldProps {
  label?: string;
  name: string;
  onClick?: () => void; // Callback quando o botão é clicado
  className?: string; // Permitir estilos personalizados
  placeholder?: string; // Texto no botão
}

export default function ImageField({
  label,
  name,
  onClick,
  className = '',
  placeholder = 'Adicione imagens', // Texto padrão do botão
}: ImageFieldProps) {
  return (
    <div className="flex flex-col w-full gap-2">
      {label && <p className="font-bold">{label}</p>}
      <button
        type="button"
        name={name}
        className={`flex items-center justify-between border w-full bg-bege border-solid border-black rounded-2xl p-[18px_8px] ${className}`}
        onClick={onClick}
      >
        <span>{placeholder}</span> {/* Texto do botão */}
        {/* Ícone de "+" */}
        <LuCirclePlus size={24} className="text-black" />
      </button>
    </div>
  );
}
