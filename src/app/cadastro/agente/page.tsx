'use client'

import { signIn } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import DropdownButton from '@/components/DropdownButton'
import InputField from '@/components/InputField'
import CustomButton from '@/components/CustomButton'

export default function RegisterAgent() {
  const [error, setError] = useState<string>('')
  const [areaCode, setAreaCode] = useState('44')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const cellphone = (form.elements.namedItem('cellphone') as HTMLInputElement)
      .value
    const password = (form.elements.namedItem('password') as HTMLInputElement)
      .value

    const result = await signIn('credentials', {
      cellphone: areaCode + cellphone,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid cellphone or password')
    } else {
      window.location.href = '/dashboard' // Redirect after login
    }
  }
  return (
    <div className="flex flex-col p-[64px_24px] gap-8">
      <div className="flex flex-col gap-12">
        <h1 className="font-bold text-2xl">PRIMEIROS PASSOS...</h1>
        <p>Crie sua conta de maneira mais rápida e fácil!</p>
      </div>
      <InputField
        label="Nome Completo: "
        type="string"
        name="name"
        placeholder=""
        required
      />
      <div className="flex flex-col gap-px-16">
        <p className="font-bold">
          Número de telefone: 
        </p>
        <div className="flex gap-px-18">
          <DropdownButton
            selectedOption={areaCode}
            setSelectedOption={setAreaCode}
          ></DropdownButton>
          <InputField
            label=""
            type="text"
            name="cellphone"
            placeholder=""
            required
          />
        </div>
      </div>

      <InputField
        label="E-mail: "
        type="string"
        name="cellphone"
        placeholder=""
        required
      />
      <InputField
        label="CPF: "
        type="string"
        name="cellphone"
        placeholder=""
        required
      />
      <InputField
        label="CRECI: "
        type="string"
        name="cellphone"
        placeholder=""
        required
      />
      <InputField
        label="Senha: "
        type="string"
        name="cellphone"
        placeholder=""
        required
      />
      <InputField
        label="Confirme a sua senha: "
        type="string"
        name="cellphone"
        placeholder=""
        required
      />
      <div className="flex flex-col gap-10">
        <label className="flex items-center gap-3 py-5 rounded-lg">
          <input
            type="radio"
            name="accountType"
            value="imobiliaria"
            onChange={(e) => setAccountType(e.target.value)}
            className="appearance-none h-[30px] w-[30px] bg-[#E9D9C9] rounded-md checked:bg-[#8b5e3cd7] focus:outline-none cursor-pointer"
          />
          <span className="font-semibold">
            Li e concordo com os Termos e Condições de Uso.
          </span>
        </label>
        <CustomButton href="/" text="Entrar" />
      </div>
    </div>
  )
}
