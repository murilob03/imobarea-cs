'use client'

import { LuWrench } from "react-icons/lu";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function Chat() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col bg-bege">
      {/* Header com a seta */}
      <div className="p-4 flex items-center mt-[48px]">
        <ArrowLeft
          size={24}
          className="cursor-pointer text-black-700"
          onClick={() => router.back()}
        />
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-grow items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <LuWrench size={48} className="text-black-500 mb-4" />
          <h1 className="text-2xl font-semibold text-black-700">Em breve!</h1>
          <p className="text-gray-500 mt-2">
            Esta funcionalidade estará disponível em breve para você. Fique atento!
          </p>
        </div>
      </div>
    </div>
  );
}