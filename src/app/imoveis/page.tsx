'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Footer from '@/components/Footer'
import EditImovel from '@/components/EditImovel'
import CustomButton from '@/components/CustomButton'

export default function ListarImoveis() {
  const [imoveis, setImoveis] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await fetch('/api/imoveisCadastrados')
        if (!response.ok) {
          const message = await response.json()
          throw new Error(message.message || 'Erro ao buscar imóveis')
        }
        const data = await response.json()
        setImoveis(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchImoveis()
  }, [])

  return (
    <div className="flex p-[64px_24px] flex-col items-center gap-8 w-full justify-between">
      {/* Conteúdo Superior */}
      <div className="flex gap-6 items-center w-full">
        <a href="/inicio">
          <ArrowLeft size={32} color="black" />
        </a>
        <h1 className="">Imóveis Cadastrados</h1>
      </div>

      <CustomButton text="Adicionar novo imóvel" href="/imoveis/novo" />

      {/* Renderiza a lista de imóveis */}
      {loading ? (
        // Esqueleto de carregamento no EditImovel
        <EditImovel loading />
      ) : error ? (
        <p>Erro ao carregar imóveis: {error}</p>
      ) : imoveis.length > 0 ? (
        <div className="pb-20">
          {imoveis.map((imovel) => <EditImovel key={imovel.id} imovel={imovel} />)}
        </div>
      ) : (
        <p>Não há imóveis cadastrados.</p>
      )}

      <Footer activeState="Perfil" />
    </div>
  )
}
