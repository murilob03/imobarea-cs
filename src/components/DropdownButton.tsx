import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DropdownButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      {/* Botão principal */}
      <div className="flex items-center bg-marrom_claro p-[18px_8px] rounded-2xl font-bold">
        <button onClick={toggleDropdown} className="flex">
          +44
          <ChevronDown />
        </button>
      </div>
      {/* Menu dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="py-1">
            <li>
              <button
                className="w-full text-left px-4 py-2 bg-bege text-red-500"
                onClick={() => alert("Opção 1 selecionada")}
              >
                +44
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                onClick={() => alert("Opção 2 selecionada")}
              >
                +11
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => alert("Opção 3 selecionada")}
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
