'use client'

import { X } from 'lucide-react'
import DropdownField from '@/components/DropdownField'
import Footer from '@/components/Footer'

export default function Filter() {
  return (
    <div className="flex h-screen flex-col items-center bg-bege">
      <div className="p-[64px_24px] flex flex-col w-full justify-between">
        <div className="flex justify-end w-full mb-[16px]">
          <X size={24} className="" />
        </div>
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold">Filtrar por</h1>
          <h1 className="text-base">limpar tudo</h1>
        </div>
        <div className="mt-[32px] flex flex-col gap-[32px]">
          <DropdownField
            name="categoria"
            options={['Apartamento', 'Casas', 'Comercial']}
            placeholder="Categoria"
          />
          <DropdownField
            name="tamanho"
            options={['100m²-', ' 100m² a 300m²', '300m²+']}
            placeholder="Tamanho"
          />
          <DropdownField
            name="numero"
            options={[1, 2, 3, 4]}
            placeholder="Número de quartos"
          />
          <DropdownField
            name="avaliacao"
            options={['3.0-', ' 3.0 a 4.0', '4.0+']}
            placeholder="Avaliação"
          />
          <DropdownField
            name="valor"
            options={['R$300,000-', 'R$300,000 a R$1,000,000', 'R$1,000,000+']}
            placeholder="Valor"
          />
          <DropdownField
            name="tipoServico"
            options={['Agente Imobiliário', 'Corretora de Imóveis']}
            placeholder="Tipo de serviço"
          />
        </div>
      </div>
      <Footer activeState="Buscar" />
    </div>
  )
}
