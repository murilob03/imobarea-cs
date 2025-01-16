import React from "react";

interface InputFieldProps {
  label?: string;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  className?: string; // Permitir estilos personalizados
  value?: string; // Adiciona o valor controlado do input
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Adiciona o evento para capturar mudanças
}

export default function InputField({
  label,
  type,
  name,
  placeholder,
  required,
  className = "",
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col w-full gap-2">
      {label && <p className="font-bold">{label}</p>}
      <input
        className={`flex border w-full bg-bege border-solid border-black rounded-2xl p-[18px_8px] ${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value} // Vincula o valor do input
        onChange={onChange} // Adiciona o evento onChange
      />
    </div>
  );
}
