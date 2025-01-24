'use client'

import SmallButton from '@/components/SmallButton'
import InputField from '@/components/InputField'
import { Search } from 'lucide-react'
import Footer from '@/components/Footer'
import ShowImovel from '@/components/ShowImovel'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function UserHome() {
  const { data: session } = useSession()
  const [imoveis, setImoveis] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await fetch('/api/imoveis')
        if (!response.ok) {
          throw new Error('Failed to fetch imoveis')
        }
        const data = await response.json()
        console.log(data)
        setImoveis(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImoveis()
  }, [])

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
        <div className="flex flex-wrap gap-4 overflow-y-auto">
          {/* List of Imoveis */}
          {imoveis.map((imovel, index) => (
            <ShowImovel key={index} imovel={imovel} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer activeState="Início" />
    </div>
  )
}
