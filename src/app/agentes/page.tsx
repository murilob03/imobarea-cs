'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import { LuSearch } from 'react-icons/lu'

export default function AccountType() {
  const router = useRouter()

  const handleContinue = () => {}

  return (
    <div className="flex h-screen flex-col items-center bg-bege">
      <div className="p-[64px_24px] flex flex-col w-full h-screen justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-[48px]">
            ASSOCIAR AGENTES IMOBILIÁRIOS...
          </h1>
          <p className="text-base mb-[32px]">
            Procure seus agentes imobiliários pelo &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; número CRECI:
          </p>
            <div className="flex items-center relative">
            <InputField
              label=""
              type="string"
              name="creci"
              placeholder=""
              required
            />
            <LuSearch size={24} className="absolute right-6" />
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
