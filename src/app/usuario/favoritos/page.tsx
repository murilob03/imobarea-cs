'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SmallButton from '@/components/SmallButton'
import InputField from '@/components/InputField'
import { ArrowLeft } from 'lucide-react'
import Footer from '@/components/Footer'
import ShowImovel from '@/components/ShowImovel'

export default function Favorites() {
  const router = useRouter()

  // Estado para armazenar o valor do input
  const [inputValue, setInputValue] = useState('')

  // Dados de exemplo dos imóveis
  const imoveis = [
    {
      id: 1,
      title: 'Noah',
      location: 'Tiradentes - zona 1, Maringá - PR',
      rating: 4.0,
      image: 'https://via.placeholder.com/342x140',
    },
    // Adicione mais imóveis conforme necessário
  ]

  // Função para limpar o campo de entrada
  const clearInput = () => {
    setInputValue('')
  }

  return (
    <div className="flex h-screen flex-col items-center bg-bege">
      <div className="p-[64px_24px] flex flex-col w-full h-full justify-between">
        <div>
          {/* Cabeçalho com seta e título */}
          <h1 className="flex items-center text-2xl font-bold mb-[48px] gap-4">
            <ArrowLeft
              size={24}
              className="cursor-pointer"
              onClick={() => router.back()}
            />
            Favoritos
          </h1>

          {/* Div de imóveis populares */}
          <div className="flex flex-wrap gap-4 overflow-y-auto max-h-[calc(100vh-350px)] w-full my-6">
            {/* Exemplo de como os imóveis serão renderizados */}
            {/* <ShowImovel
              title={imoveis[0].title}
              location={imoveis[0].location}
              rating={imoveis[0].rating}
              image={imoveis[0].image}
              area={100}
              garage={2}
              bedrooms={3}
              builder="Construtora XYZ"
            /> */}
          </div>
        </div>
      </div>
      <Footer activeState="Favoritos" />
    </div>
  )
}
