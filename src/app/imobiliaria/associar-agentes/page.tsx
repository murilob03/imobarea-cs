'use client'

import AgenteCard from '@/components/AgenteCard'
import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import { AgenteLer } from '@/types/usuarios'
import { Search } from 'lucide-react'
import { useState } from 'react'

export default function AssociarAgente() {
  const [agente, setAgente] = useState<AgenteLer | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleContinue = () => {
    // Add logic for "Continuar" button if needed
  }

  const handleSearch = async () => {
    setHasSearched(true)
    setAgente(null)

    const creciInput = document.querySelector(
      'input[name="creci"]'
    ) as HTMLInputElement

    if (!creciInput) {
      setErrorMessage('Input field not found.')
      return
    }

    const creci = creciInput.value

    try {
      if (!creci) throw new Error('Por favor, insira um número CRECI válido.')

      const response = await fetch(`/api/usuario?query=creci:${creci}`)
      if (!response.ok) throw new Error('Erro ao buscar o agente.')

      const fetchedAgents = await response.json()

      if (Array.isArray(fetchedAgents) && fetchedAgents.length > 0) {
        setAgente(fetchedAgents[0]) // Assign the first agent
        setErrorMessage(null) // Clear error message
      } else {
        throw new Error('Nenhum agente encontrado.')
      }

      setAgente(fetchedAgents[0])
      console.log(agente)

      setErrorMessage(null) // Clear error message
    } catch (error) {
      setAgente(null)
      setErrorMessage(error.message || 'Erro desconhecido.')
    }
  }

  return (
    <div className="flex h-screen flex-col items-center bg-bege">
      <div className="p-[64px_24px] flex flex-col w-full h-screen justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-[48px]">
            ASSOCIAR AGENTES IMOBILIÁRIOS...
          </h1>
          <p className="text-base mb-[32px]">
            Procure seus agentes imobiliários pelo número CRECI:
          </p>
          <div className="flex items-center relative">
            <InputField
              label=""
              type="string"
              name="creci"
              placeholder=""
              required
            />
            <Search
              size={24}
              className="absolute right-6 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
          <div className="mt-[32px]">
            {hasSearched ? (
              agente?.name ? (
                <AgenteCard agente={agente} />
              ) : (
                <p className="text-red-500">Agente não encontrado.</p>
              )
            ) : null}
          </div>
        </div>
        <div className="flex flex-col">
          <CustomButton
            text="Continuar"
            onClick={handleContinue}
            type="button"
          />
        </div>
      </div>
    </div>
  )
}
