'use client'

import { useRouter } from 'next/navigation'
import SmallButton from '@/components/SmallButton'
import InputField from '@/components/InputField'
import { LuSearch } from 'react-icons/lu'
import Footer from '@/components/Footer'

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center bg-bege">
      <div className="p-[64px_24px] flex flex-col w-full h-full justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-[48px]">
            Encontre seu <br />
            imóvel dos sonhos
          </h1>
          <div className="flex items-center relative">
            <InputField
              label=""
              type="string"
              name="creci"
              placeholder="Qual região você está procurando?"
              required
              className="pl-14 placeholder:text-black text-base"
            />
            <LuSearch size={24} className="absolute left-6" />
          </div>
          <div className="mt-[32px] flex gap-4">
            {/* Botões dinâmicos */}
            <SmallButton text="Apartamento" />
            <SmallButton text="Casas" />
            <SmallButton text="Comercial" />
          </div>
          <h1 className="text-2xl font-bold mt-[32px]">
            Populares
          </h1>
          
          {/* Div de imóveis populares com rolagem infinita */}
          <div className="flex flex-wrap gap-4 overflow-y-auto max-h-[calc(100vh-350px)] w-full">
            {/* Exemplo de imóvel popular */}
            {[...Array(10)].map((_, idx) => (
              <div
                key={idx}
                className="w-[342px] h-[235px] bg-gray-300 rounded-lg shadow-lg"
              >
                {/* Aqui vai o conteúdo do imóvel, como imagem, título, etc. */}
                <p className="text-center p-2">Imóvel {idx + 1}</p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
