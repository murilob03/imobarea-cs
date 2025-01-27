'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import InputField from '@/components/InputField'
import { Search, CircleX, SlidersHorizontal, ArrowLeft } from 'lucide-react'
import Footer from '@/components/Footer'
import ShowImovel from '@/components/ShowImovel'
import { useSession } from 'next-auth/react'
import { ImovelLer } from '@/types/imovel'
import ImovelPage from '@/app/imoveis/[id]/page'

export default function Busca() {
  const { data: session } = useSession()
  const router = useRouter()
  const [inputValue, setInputValue] = useState('')
  const [imoveis, setImoveis] = useState<ImovelLer[]>([])
  const [visibleImoveis, setVisibleImoveis] = useState<ImovelLer[]>([])
  const [loading, setLoading] = useState(true)

  // Set loading to false once session is available
  useEffect(() => {
    if (session) {
      setLoading(false)
    }
  }, [session])

  // Fetch imóveis (properties)
  const fetchImoveis = async () => {
    try {
      const res = await fetch('/api/imoveis', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setImoveis(data || [])
      setVisibleImoveis(imoveis)
    } catch (err) {
      console.error(err)
    }
  }

  // Fetch imóveis when the component mounts or when session changes
  useEffect(() => {
    if (session?.user?.id) {
      fetchImoveis()
    }
  }, [session])

  // Function to clear the input field
  const clearInput = () => {
    setInputValue('')
  }

  const filterImoveis = () => {
    if (!inputValue) {
      setVisibleImoveis(imoveis)
      return
    }
    const filteredImoveis = imoveis.filter(
      (imovel) =>
        imovel.nome.toLowerCase().includes(inputValue.toLowerCase()) ||
        imovel.tipo.toLowerCase().includes(inputValue.toLowerCase()) ||
        imovel.endereco.cidade
          .toLowerCase()
          .includes(inputValue.toLowerCase()) ||
        imovel.endereco.estado
          .toLowerCase()
          .includes(inputValue.toLowerCase()) ||
        imovel.endereco.logradouro
          .toLowerCase()
          .includes(inputValue.toLowerCase())
    )
    setVisibleImoveis(filteredImoveis)
  }

  useEffect(() => {
    filterImoveis()
  }, [inputValue])

  if (loading) return <p>Carregando...</p>

  return (
    <div className="flex h-screen flex-col items-center bg-bege">
      <div className="flex p-[64px_24px] flex-col w-full justify-between pb-36 gap-4">
        {/* Header with back arrow and title */}
        <h1 className="flex items-center text-2xl font-bold mb-6 gap-4">
          <ArrowLeft
            size={24}
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          Busca
        </h1>

        {/* Input field with icons */}
        <div>
          <div className="flex items-center relative">
            <InputField
              label=""
              type="string"
              name="creci"
              placeholder=""
              required
              className="pl-14 placeholder:text-black text-base"
              value={inputValue} // Controlled input value
              onChange={(e) => setInputValue(e.target.value)} // Update state on input change
            />
            <Search size={24} className="absolute left-6" />
            <CircleX
              size={24}
              className="absolute right-6 cursor-pointer"
              onClick={clearInput} // Clear input field
            />
          </div>

          {/* Filter button */}
          <div className="flex justify-end">
            <button
              className="flex items-center gap-2 text-base font-semibold px-4 py-2"
              onClick={() => router.push('/usuario/busca/filtro')}
            >
              <SlidersHorizontal size={18} />
              filtrar
            </button>
          </div>
        </div>

        {/* Popular properties section */}

        {/* Render properties */}
        {visibleImoveis.length > 0 ? (
          visibleImoveis.map((imovel) => (
            <ShowImovel key={imovel.id} imovel={imovel} />
          ))
        ) : (
          <p>Nenhum imóvel encontrado</p>
        )}
      </div>
      <Footer activeState="Buscar" />
    </div>
  )
}
