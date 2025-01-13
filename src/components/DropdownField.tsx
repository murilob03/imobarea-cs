import React, { useState } from "react";
import { ChevronDown } from "lucide-react"; // Importando o ícone de seta para baixo

interface DropdownFieldProps {
  label?: string;
  name: string;
  options: number[]; // Lista de opções como números (ex: 1, 2, 3, etc)
  required?: boolean;
  className?: string; // Permitir estilos personalizados
  placeholder?: string; // Placeholder dinâmico
}

export default function DropdownField({
  label,
  name,
  options,
  required,
  className = "",
  placeholder = "Selecione uma opção", // Valor padrão para o placeholder
}: DropdownFieldProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(Number(event.target.value));
  };

  return (
    <div className="flex flex-col w-full gap-2">
      {label && <p className="font-bold">{label}</p>}
      <div className="relative">
        <select
          className={`flex border w-full bg-bege border-solid border-black rounded-2xl p-[18px_8px] pr-10 ${className} appearance-none`}
          name={name}
          value={selectedValue || ""}
          onChange={handleChange}
          required={required}
        >
          <option value="" disabled>
            {placeholder} {/* Usando o placeholder dinâmico */}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* Ícone de seta para baixo */}
        <ChevronDown
          size={24}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black"
        />
      </div>
    </div>
  );
}
