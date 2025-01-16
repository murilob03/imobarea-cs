'use client'

import AgenteCard from '@/components/AgenteCard'
import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import SmallButton from '@/components/SmallButton'
import { UserRole } from '@/types'
import { AgenteLer } from '@/types/usuarios'
import { Search, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function AssociarAgente() {
  const { data: session } = useSession()

  const [agente, setAgente] = useState<AgenteLer | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  if (!session) {
    return <p>Loading...</p>
  } else if (session.user.role !== UserRole.IMOBILIARIA) {
    return (
      <p className="text-red-500">
        Você não tem permissão para acessar esta página!
      </p>
    )
  }

  const handleContinue = async () => {
    // router.push('/imobiliaria/associar-agentes/sucesso')
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

      const response = await fetch(`/api/agente?creci=${creci}`)
      if (!response.ok) throw new Error('Erro ao buscar o agente.')

      const agenteFetched = await response.json()
      setAgente(agenteFetched)

      console.log(agente)

      setErrorMessage(null) // Clear error message
    } catch (error: any) {
      setAgente(null)
      setErrorMessage(error.message || 'Erro desconhecido.')
    }
  }

  const handleAddAgente = async () => {
    if (!agente) {
      setErrorMessage('Por favor, selecione um agente.')
      return
    }

    try {
      const response = await fetch(`/api/agente/${agente.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imobiliariaId: session.user.id,
        }),
      })
      if (!response.ok) throw new Error('Erro ao associar o agente.')
      const data = await response.json()

      setAgente(null)
      setHasSearched(false)

      // success message
      console.log(data)
    } catch (error: any) {
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
              agente ? (
                <div className="flex flex-col items-center gap-4 mt-[32px]">
                  <AgenteCard agente={agente} />
                  {agente.imobiliariaId ? (
                    <p className="text-red-500">
                      Agente já cadastrado em outra imobiliária!
                    </p>
                  ) : (
                    <button className="flex justify-center items-center text-xs rounded-full transition-all duration-300 bg-marrom">
                      <p className="text-white font-bold px-4 py-2">
                        Adicionar
                      </p>
                    </button>
                  )}
                </div>
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
