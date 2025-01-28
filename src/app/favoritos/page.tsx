'use client'

import React, { useState, useEffect } from 'react'
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
  const [favoritos, setFavoritos] = useState([]) // Estado para armazenar os imóveis favoritos

  // Função que busca os imóveis favoritos do usuário
  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const response = await fetch('/api/favoritos')
        if (response.ok) {
          const data = await response.json()
          setFavoritos(data)
        } else {
          console.error('Falha ao buscar favoritos')
        }
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error)
      }
    }

    fetchFavoritos()
  }, []) // Executa a busca apenas uma vez após o primeiro render

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
            {/* Exibindo os imóveis favoritos */}
            {favoritos.length > 0 ? (
              favoritos.map((imovel: any) => (
                <ShowImovel key={imovel.id} imovel={imovel} />
              ))
            ) : (
              <p>Você não tem imóveis favoritos.</p>
            )}
          </div>
        </div>
      </div>
      <Footer activeState="Favoritos" />
    </div>
  )
}
