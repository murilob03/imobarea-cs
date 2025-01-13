'use client'

import React, { useState } from 'react'
import InputField from '@/components/InputField'
import DropdownButton from '@/components/DropdownButton'
import CustomButton from '@/components/CustomButton'

export default function RegistrationForm() {
  const [selectedOption, setSelectedOption] = useState('55')
  const [isChecked, setIsChecked] = useState(false)

  const toggleCheckbox = () => setIsChecked(!isChecked)

  return (
    <div className="flex flex-col items-center bg-[#F6F3EC] w-[390px] h-[1147px] mx-auto px-6 py-4">
      <div className="text-left mt-8 mb-6 w-full">
        <h1 className="text-2xl font-bold mb-[48px]">PRIMEIROS PASSOS...</h1>
        <p className="text-base mt-2 ">
          Crie sua conta de maneira rápida e fácil!
        </p>
      </div>

      <form className=" mb-[32px] flex flex-col gap-4 w-full max-w-md">
        <InputField
          label="Razão social:"
          type="text"
          name="razaoSocial"
          placeholder=""
          required
        />
        <label className="font-semibold text-base">Número de celular:</label>
        <div className="flex gap-4 items-center">
          <DropdownButton
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <InputField
            label=""
            type="tel"
            name="telefone"
            placeholder=""
            required
          />
        </div>
        <InputField
          label="E-mail:"
          type="email"
          name="email"
          placeholder=""
          required
        />
        <InputField
          label="CPF:"
          type="text"
          name="cnpj"
          placeholder=""
          required
        />
        <InputField
          label="CRECI:"
          type="text"
          name="creci"
          placeholder=""
          required
        />
        <InputField
          label="Senha:"
          type="password"
          name="senha"
          placeholder=""
          required
        />
        <InputField
          label="Confirme a sua senha:"
          type="password"
          name="confirmSenha"
          placeholder=""
          required
        />

        <div className="flex items-center mt-[32px] gap-[25px]">
          <input
            type="checkbox"
            className="appearance-none h-[30px] w-[30px] bg-[#E9D9C9] rounded-lg checked:bg-[#8b5e3cd7] focus:outline-none cursor-pointer flex-shrink-0"
            checked={isChecked}
            onChange={toggleCheckbox}
          />
          <label className="font-semibold text-base leading-none">
            Li e concordo com os Termos e Condições de Uso.
          </label>
        </div>

        <div className="mt-4">
          <CustomButton href="/pagina-principal" text="Continuar" />
        </div>
      </form>
    </div>
  )
}
