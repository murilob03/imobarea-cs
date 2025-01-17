'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import DropdownField from '@/components/DropdownField'
import Footer from '@/components/Footer'

export default function Filter() {
  // Estado para armazenar os valores selecionados em cada dropdown
  const [filters, setFilters] = useState<{
    categoria: string | number
    tamanho: string | number
    numero: string | number
    valor: string | number
    tipoServico: string | number
  }>({
    categoria: '',
    tamanho: '',
    numero: '',
    valor: '',
    tipoServico: '',
  })

  // Função para redefinir os valores dos filtros
  const resetFilters = () => {
    setFilters({
      categoria: '',
      tamanho: '',
      numero: '',
      valor: '',
      tipoServico: '',
    })
  }

  return (
    <div className="flex h-screen flex-col items-center bg-bege">
      <div className="p-[64px_24px] flex flex-col w-full justify-between">
        <div className="flex justify-end w-full mb-[16px]">
          <X size={24} className="" />
        </div>
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold">Filtrar por</h1>
          <h1 className="text-base cursor-pointer" onClick={resetFilters}>
            limpar tudo
          </h1>
        </div>
        <div className="mt-[32px] flex flex-col gap-[32px]">
          <DropdownField
            name="categoria"
            options={['Apartamento', 'Casas', 'Comercial']}
            placeholder="Categoria"
            value={filters.categoria}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, categoria: value }))
            }
          />
          <DropdownField
            name="tamanho"
            options={['100m²-', ' 100m² a 300m²', '300m²+']}
            placeholder="Tamanho"
            value={filters.tamanho}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, tamanho: value }))
            }
          />
          <DropdownField
            name="numero"
            options={[1, 2, 3, 4]}
            placeholder="Número de quartos"
            value={filters.numero}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, numero: value }))
            }
          />
          <DropdownField
            name="valor"
            options={['R$300,000-', 'R$300,000 a R$1,000,000', 'R$1,000,000+']}
            placeholder="Valor"
            value={filters.valor}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, valor: value }))
            }
          />
          <DropdownField
            name="tipoServico"
            options={['Agente Imobiliário', 'Corretora de Imóveis']}
            placeholder="Tipo de serviço"
            value={filters.tipoServico}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, tipoServico: value }))
            }
          />
        </div>
      </div>
      <Footer activeState="Buscar" />
    </div>
  )
}
