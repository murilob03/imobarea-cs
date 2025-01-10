'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AccountType() {
  const [accountType, setAccountType] = useState('')
  const router = useRouter()

  const handleContinue = () => {
    if (accountType === 'cliente') {
      router.push('/cadastro/cliente')
    } else if (accountType === 'imobiliaria') {
      router.push('/cadastro/imobiliaria')
    } else if (accountType === 'agente') {
      router.push('/cadastro/agente')
    } else {
      alert('Por favor, selecione um tipo de conta.')
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#FAF5F0] p-6">
      <div className="mt-[64px] flex flex-col w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-[48px]">SEJA BEM-VINDO!</h1>
        <p className="text-base mb-[32px]">
          Crie sua conta de maneira rápida e fácil!
        </p>
        <p className="mb-7 font-bold">
          Selecione o tipo de conta que deseja criar:
        </p>
        <label className="flex items-center gap-3 py-5 rounded-lg">
          <input
            type="radio"
            name="accountType"
            value="cliente"
            onChange={(e) => setAccountType(e.target.value)}
            className="appearance-none h-[30px] w-[30px] bg-[#E9D9C9] rounded-md checked:bg-[#8b5e3cd7] focus:outline-none cursor-pointer"
          />
          <span className="text-xl font-semibold">Cliente</span>
        </label>
        <label className="flex items-center gap-3 py-5 rounded-lg">
          <input
            type="radio"
            name="accountType"
            value="imobiliaria"
            onChange={(e) => setAccountType(e.target.value)}
            className="appearance-none h-[30px] w-[30px] bg-[#E9D9C9] rounded-md checked:bg-[#8b5e3cd7] focus:outline-none cursor-pointer"
          />
          <span className="text-xl font-semibold">Imobiliária</span>
        </label>
        <label className="flex items-center gap-3 py-5 rounded-lg">
          <input
            type="radio"
            name="accountType"
            value="agente"
            onChange={(e) => setAccountType(e.target.value)}
            className="appearance-none h-[30px] w-[30px] bg-[#E9D9C9] rounded-md checked:bg-[#8b5e3cd7] focus:outline-none cursor-pointer"
          />
          <span className="text-xl font-semibold">Agente Imobiliário</span>
        </label>
      </div>
      <div className="mt-auto w-full flex justify-center">
        <button
          className="text-base p-4 h-[71px] w-[344px] max-w-sm bg-[#8B5E3C] text-white font-bold rounded-full flex items-center justify-center"
          onClick={handleContinue}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
