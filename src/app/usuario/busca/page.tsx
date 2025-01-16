'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import InputField from '@/components/InputField'
import { Search, CircleX, SlidersHorizontal, ArrowLeft } from 'lucide-react'
import Footer from '@/components/Footer'
import ShowImovel from '@/components/ShowImovel'

export default function Busca() {
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
            Busca
          </h1>

          {/* Campo de entrada com ícones */}
          <div className="flex items-center relative">
            <InputField
              label=""
              type="string"
              name="creci"
              placeholder=""
              required
              className="pl-14 placeholder:text-black text-base"
              value={inputValue} // Controla o valor do input pelo estado
              onChange={(e) => setInputValue(e.target.value)} // Atualiza o estado quando o usuário digita
            />
            <Search size={24} className="absolute left-6" />
            <CircleX
              size={24}
              className="absolute right-6 cursor-pointer"
              onClick={clearInput} // Limpa o campo ao clicar
            />
          </div>

          {/* Botão Filtrar */}
          <div className="flex justify-end mt-4">
            <button
              className="flex items-center gap-2 text-base font-semibold px-4 py-2"
              onClick={() => router.push('/usuario/busca/filtro')}
            >
              <SlidersHorizontal size={18} />
              filtrar
            </button>
          </div>

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
        <Footer />
      </div>
    </div>
  )
}
