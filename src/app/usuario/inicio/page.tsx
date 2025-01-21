'use client'

import { useRouter } from 'next/navigation'
import SmallButton from '@/components/SmallButton'
import InputField from '@/components/InputField'
import { Search } from 'lucide-react'
import Footer from '@/components/Footer'
import ShowImovel from '@/components/ShowImovel'
import { ImovelLer } from '@/types/usuarios'

export default function UserHome() {
  const router = useRouter()

  const imovelExemplo: ImovelLer = {
    id: '1',
    title: 'Apartamento Moderno',
    location: 'Av. Paulista, São Paulo, SP',
    image: '/apartamento.jpg',
    area: 75,
    garage: 1,
    bedrooms: 2,
    builder: 'Construtora XYZ',
    agent: 'João Silva',
    type: 'Apartamento',
    image_agent: '/joao_silva.jpg',
  }

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
            <Search size={24} className="absolute left-6" />
          </div>
          <div className="mt-[32px] flex gap-4">
            {/* Botões dinâmicos */}
            <SmallButton text="Apartamento" />
            <SmallButton text="Casas" />
            <SmallButton text="Comercial" />
          </div>
          <h1 className="text-2xl font-bold mt-[32px] mb-[24px]">Populares</h1>

          {/* Div de imóveis populares com margem acima e abaixo */}
          <div className="flex flex-wrap gap-4 overflow-y-auto max-h-[calc(100vh-350px)] w-full my-6">
            <ShowImovel imovel={imovelExemplo} />
          </div>
        </div>
      </div>
      <Footer activeState="Início" />
    </div>
  )
}
