import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface DropdownButtonProps {
  selectedOption: string
  setSelectedOption: (option: string) => void
  type: 'DDD' | 'Estado' // Tipo do dropdown
}

export default function DropdownButton({
  selectedOption,
  setSelectedOption,
  type,
}: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Valores hardcoded para DDD e Estados
  const options =
    type === 'DDD'
      ? ['11', '44', '43', '21', '31', '51', '61', '71', '81', '91', '98', '65', '62', '84']
      : [
          'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
        ]

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option) // Atualiza o valor selecionado
    setIsOpen(false) // Fecha o dropdown
  }

  return (
    <div className="relative inline-block text-left w-[71px] h-[60px]">
      {/* Botão principal */}
      <div className="flex items-center bg-marrom_claro p-[18px_8px] rounded-2xl font-bold">
        <button onClick={toggleDropdown} className="flex items-center">
          {`${type === 'DDD' ? '+' : ''}${selectedOption}`}
          <ChevronDown className="text-marrom ml-2" />
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
                  {type === 'DDD' ? `+${option}` : option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
