import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownButtonProps {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

export default function DropdownButton({ selectedOption, setSelectedOption }: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option); // Atualiza o valor selecionado
    setIsOpen(false); // Fecha o dropdown
  };

  return (
    <div className="relative inline-block text-left">
      {/* Botão principal */}
      <div className="flex items-center bg-marrom_claro p-[18px_8px] rounded-2xl font-bold">
        <button onClick={toggleDropdown} className="flex">
          {'+' + selectedOption}
          <ChevronDown className="text-marrom"/>
        </button>
      </div>
      {/* Menu dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-auto bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <ul className="py-1">
            <li>
              <button
                className="w-auto text-center px-4 py-2 text-black hover:bg-gray-200"
                onClick={() => handleOptionSelect("44")}
              >
                +44
              </button>
            </li>
            <li>
              <button
                className="w-auto text-center px-4 py-2 text-black hover:bg-gray-200"
                onClick={() => handleOptionSelect("11")}
              >
                +11
              </button>
            </li>
            <li>
              <button
                className="w-auto text-center px-4 py-2 text-black hover:bg-gray-200"
                onClick={() => handleOptionSelect("43")}
              >
                +43
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
