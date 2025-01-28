'use client'

import SmallButton from '@/components/SmallButton'
import InputField from '@/components/InputField'
import { Search } from 'lucide-react'
import Footer from '@/components/Footer'
import ShowImovel from '@/components/ShowImovel'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ImovelLer } from '@/types/imovel'

type TipoFilter = {
  Apartamento: boolean
  Casa: boolean
  Comercial: boolean
}

export default function UserHome() {
  const { data: session } = useSession()
  const [imoveis, setImoveis] = useState<ImovelLer[]>([])
  const [filteredImoveis, setFilteredImoveis] = useState<ImovelLer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [tipoFilter, setTipoFilter] = useState<TipoFilter>({
    Apartamento: false,
    Casa: false,
    Comercial: false,
  })

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await fetch('/api/imoveis')
        if (!response.ok) {
          throw new Error('Failed to fetch imoveis')
        }
        const data: ImovelLer[] = await response.json()
        setImoveis(data)
        setFilteredImoveis(data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('Unknown error occurred')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchImoveis()
  }, [])

  const toggleTipoFilter = (tipo: keyof TipoFilter) => {
    const updatedTipoFilter = { ...tipoFilter, [tipo]: !tipoFilter[tipo] }
    setTipoFilter(updatedTipoFilter)
  }

  const filterImoveis = (search: string) => {
    const filtered = imoveis.filter((imovel) => {
      const textMatch =
        imovel.nome.toLowerCase().includes(search.toLowerCase()) ||
        imovel.endereco.cidade.toLowerCase().includes(search.toLowerCase()) ||
        imovel.endereco.estado.toLowerCase().includes(search.toLowerCase()) ||
        imovel.endereco.logradouro.toLowerCase().includes(search.toLowerCase())

      let typeMatch = true
      for (const tipo in tipoFilter) {
        if (tipoFilter[tipo as keyof TipoFilter]) {
          typeMatch = imovel.tipo === tipo.toUpperCase()
        }
      }

      return textMatch && typeMatch
    })

    setFilteredImoveis(filtered)
  }

  useEffect(() => {
    filterImoveis(inputValue)
  }, [inputValue, tipoFilter])

  if (!session) {
    return <p>Loading session...</p>
  }
  if (isLoading) {
    return <p>Loading imoveis...</p>
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>
  }

  return (
    <div className="flex flex-col min-h-screen bg-bege">
      {/* Content Area */}
      <div className="flex-1 p-[64px_24px] pb-[132px]">
        <h1 className="text-2xl font-bold mb-[48px]">
          Encontre seu <br />
          imóvel dos sonhos
        </h1>
        <div className="flex items-center relative">
          <InputField
            label=""
            type="string"
            name="search"
            placeholder="Qual região você está procurando?"
            required
            className="pl-14 placeholder:text-black text-base"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
          />
          <Search size={24} className="absolute left-6" />
        </div>
        <div className="mt-[32px] flex gap-4">
          {/* Dynamic Buttons */}
          {Object.keys(tipoFilter).map((tipo) => (
            <SmallButton
              key={tipo}
              text={tipo}
              onClick={() => toggleTipoFilter(tipo as keyof TipoFilter)}
            />
          ))}
        </div>
        <h1 className="text-2xl font-bold mt-[32px] mb-[24px]">Populares</h1>
        <div className="flex flex-wrap gap-4 overflow-y-auto">
          {/* List of Filtered Imoveis */}
          {filteredImoveis.map((imovel, index) => (
            <ShowImovel key={index} imovel={imovel} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer activeState="Início" />
    </div>
  )
}
