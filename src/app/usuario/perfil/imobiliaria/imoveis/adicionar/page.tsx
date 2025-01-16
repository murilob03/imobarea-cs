'use client'

import React, { useState } from 'react'
import InputField from '@/components/InputField'
import DropdownButton from '@/components/DropdownButton'
import DropdownField from '@/components/DropdownField'
import CustomButton from '@/components/CustomButton'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { UserRole, UserCriar } from '@/types'
import ImageField from '@/components/ImageField'

export default function RegistrationForm() {
  const router = useRouter()

  const [selectedOption, setSelectedOption] = useState('PR')
  const [isChecked, setIsChecked] = useState(false)

  const toggleCheckbox = () => setIsChecked(!isChecked)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget

    if (!isChecked) {
      console.log('Voce deve concordar com os termos!')
      return
    }

    const password = (form.elements.namedItem('password') as HTMLInputElement)
      .value
    const confirmPassword = (
      form.elements.namedItem('confirmPassword') as HTMLInputElement
    ).value

    if (password !== confirmPassword) {
      console.log('As senhas não são iguais!')
      return
    }

    const cellphone = `${selectedOption}${
      (form.elements.namedItem('cellphone') as HTMLInputElement).value
    }`

    const nova_imobiliaria: UserCriar = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      cellphone: cellphone,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      cnpj: (form.elements.namedItem('cnpj') as HTMLInputElement).value,
      password: password,
      role: UserRole.IMOBILIARIA,
    }

    try {
      const response = await fetch('/api/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nova_imobiliaria),
      })

      if (response.ok) {
        console.log('Imobiliária criada com sucesso!')
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
        <h1 className="flex items-center text-2xl font-bold mb-[48px] gap-4">
          <ArrowLeft
            size={24}
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          Novo imóvel
        </h1>
      </div>

      <form
        className=" mb-[32px] flex flex-col gap-4 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <InputField
          label="Nome do Imóvel:"
          type="text"
          name="name"
          placeholder=""
          required
        />
        <InputField
          label="Área privada:"
          type="text"
          name="area"
          placeholder=""
          required
        />
        <label className="font-semibold text-base">N° de quartos: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; N° de vagas de garagem:</label>
                <div className="flex gap-4 items-center">
                <InputField
                    className='w-[120px] h-[56px]'
                    label=""
                    type="number"
                    name="quartos"
                    placeholder=""
                    required
                  />
                  <InputField
                  className='w-[206px] h-[56px]'
                    label=""
                    type="number"
                    name="vagas"
                    placeholder=""
                    required
                  />
                </div>
        <InputField
          label="Rua:"
          type="text"
          name="rua"
          placeholder=""
          required
        />
        <InputField
          label="Bairro:"
          type="text"
          name="bairro"
          placeholder=""
          required
        />
        <InputField
          label="Complemento:"
          type="text"
          name="complemento"
          placeholder=""
          required
        />
        <label className="font-semibold text-base">Estado: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cidade:</label>
                <div className="flex gap-4 items-center">
                <DropdownButton
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                type="Estado" // Define o tipo como DDD
                />
                  <InputField
                    label=""
                    type="text"
                    name="cidade"
                    placeholder=""
                    required
                  />
                </div>
                <DropdownField
          className='font-bold'
          name="tipo-movel"
          options={['Apartamentos', 'Casa', 'Comercial']}
          placeholder="Tipo Imóvel"
        />
        <ImageField
            className='font-bold'
            name="add-image"
            placeholder="Adicione fotos do imóvel"
        />
        <div className="mt-4">
          <CustomButton text="Concluir" type="submit" />
        </div>
      </form>
    </div>
  )
}
