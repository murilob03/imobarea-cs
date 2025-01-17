import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react' // Importando o ícone de seta para baixo

interface DropdownFieldProps {
  label?: string
  name: string
  options: (string | number)[] // Lista de opções pode conter strings ou números
  required?: boolean
  className?: string // Permitir estilos personalizados
  placeholder?: string // Placeholder dinâmico
  value?: string | number // Valor selecionado controlado externamente
  onChange?: (value: string | number) => void // Função de callback ao alterar o valor
}

export default function DropdownField({
  label,
  name,
  options,
  required,
  className = '',
  placeholder = 'Selecione uma opção', // Valor padrão para o placeholder
  value,
  onChange,
}: DropdownFieldProps) {
  const [internalValue, setInternalValue] = useState<string | number | null>(
    null
  )

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = isNaN(Number(event.target.value))
      ? event.target.value
      : Number(event.target.value)

    // Atualiza o valor interno se o controle for local
    setInternalValue(selectedValue)

    // Chama o callback de mudança se fornecido
    if (onChange) {
      onChange(selectedValue)
    }
  }

  return (
    <div className="flex flex-col w-full gap-2">
      {label && <p className="font-bold">{label}</p>}
      <div className="relative">
        <select
          className={`flex border w-full bg-bege border-solid border-black rounded-2xl p-[18px_8px] pr-10 ${className} appearance-none`}
          name={name}
          value={value !== undefined ? value : internalValue || ''}
          onChange={handleChange}
          required={required}
        >
          <option value="" disabled>
            {placeholder} {/* Usando o placeholder dinâmico */}
          </option>
          {options.map((option) => (
            <option key={option.toString()} value={option}>
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
  )
}
