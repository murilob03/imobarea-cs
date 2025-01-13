'use client'

import React, { useState } from 'react'
import InputField from '@/components/InputField'
import DropdownButton from '@/components/DropdownButton'
import CustomButton from '@/components/CustomButton'
import { useRouter } from 'next/navigation'
import { UserRole, UserCriar } from '@/types'

export default function RegistrationForm() {
  const router = useRouter()

  const [selectedOption, setSelectedOption] = useState('44')
  const [isChecked, setIsChecked] = useState(false)

  const toggleCheckbox = () => setIsChecked(!isChecked)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget

    if (!isChecked) {
      console.log('Voce deve concordar com os termos!')
      return
    }

    const senha = (form.elements.namedItem('senha') as HTMLInputElement).value
    const confirmaSenha = (
      form.elements.namedItem('confirmSenha') as HTMLInputElement
    ).value

    if (senha !== confirmaSenha) {
      console.log('As senhas não são iguais!')
      return
    }

    const telefone = `${selectedOption}${
      (form.elements.namedItem('telefone') as HTMLInputElement).value
    }`

    const novo_cliente: UserCriar = {
      name: (form.elements.namedItem('nome') as HTMLInputElement).value,
      cellphone: telefone,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      cpf: (form.elements.namedItem('cpf') as HTMLInputElement).value,
      password: senha,
      role: UserRole.CLIENTE,
    }

    try {
      const response = await fetch('/api/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novo_cliente),
      })

      if (response.ok) {
        console.log('Cliente criado com sucesso!')
        router.push('/login')
      } else {
        console.error('Erro ao criar cliente:', response.statusText)
      }
    } catch (error) {
      console.error('Erro ao criar cliente:', error)
    }
  }

  return (
    <div className="flex flex-col items-center bg-[#F6F3EC] w-[390px] h-[1147px] mx-auto px-6 py-4">
      <div className="text-left mt-8 mb-6 w-full">
        <h1 className="text-2xl font-bold mb-[48px]">PRIMEIROS PASSOS...</h1>
        <p className="text-base mt-2 ">
          Crie sua conta de maneira rápida e fácil!
        </p>
      </div>

      <form
        className=" mb-[32px] flex flex-col gap-4 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <InputField
          label="Nome completo:"
          type="text"
          name="nome"
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
            name="password"
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
          name="cpf"
          placeholder=""
          required
        />
        <InputField
          label="Senha:"
          type="password"
          name="password"
          placeholder=""
          required
        />
        <InputField
          label="Confirme a sua senha:"
          type="password"
          name="password"
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
          <CustomButton text="Continuar" type="submit" />
        </div>
      </form>
    </div>
  )
}
