import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface DropdownButtonProps {
  selectedOption: string
  setSelectedOption: (option: string) => void
  options: string[] // Opções do dropdown
}

export default function DropdownButton({
  selectedOption,
  setSelectedOption,
  options,
}: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option) // Atualiza o valor selecionado
    setIsOpen(false) // Fecha o dropdown
  }

  return (
    <div className="relative inline-block text-left h-[60px]">
      {/* Botão principal */}
      <div className="flex items-center bg-marrom_claro p-[18px_8px] rounded-2xl font-bold relative w-[70px]">
        <button
          onClick={toggleDropdown}
          className="flex items-center w-full text-left pr-6"
        >
          <span>{`${selectedOption}`}</span>
          <ChevronDown className="text-marrom absolute right-1" />
        </button>
      </div>

      {/* Menu dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-auto bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-10 max-h-40 overflow-y-auto"
          style={{ maxHeight: '10rem', overflowY: 'auto' }} // Limita a altura a 10rem (~160px)
        >
          <ul className="py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  className="w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
