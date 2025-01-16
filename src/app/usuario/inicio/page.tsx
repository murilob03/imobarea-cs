'use client'

import { useRouter } from 'next/navigation'
import SmallButton from '@/components/SmallButton'
import InputField from '@/components/InputField'
import { Search } from 'lucide-react'
import Footer from '@/components/Footer'
import ShowImovel from '@/components/ShowImovel'

export default function UserHome() {
  const router = useRouter();

  // Dados de exemplo dos imóveis
  const imoveis = [
    {
      id: 1,
      title: 'Noah',
      location: 'Tiradentes - zona 1, Maringá - PR',
      image: 'https://via.placeholder.com/342x140',
    },
    // Adicione mais imóveis conforme necessário
  ]

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
          <h1 className="text-2xl font-bold mt-[32px] mb-[24px]">Populares</h1>

          {/* Div de imóveis populares com margem acima e abaixo */}
          <div className="flex flex-wrap gap-4 overflow-y-auto max-h-[calc(100vh-350px)] w-full my-6">
            {/* <ShowImovel
            title={imoveis[0].title}
            location={imoveis[0].location}
            image={imoveis[0].image}
            // exemplo
            area = {100} 
            garage={2} 
            bedrooms={3} 
            builder="Construtora XYZ" 
          />} */}
          </div>
        </div>
        <Footer activeState="Início" />
      </div>
    </div>
  )
}
