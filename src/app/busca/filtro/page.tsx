'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import DropdownField from '@/components/DropdownField'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'
import CustomButton from '@/components/CustomButton'

export default function Filter() {
  const router = useRouter()
  const [filters, setFilters] = useState<{
    categoria: string
    tamanho: string
    numero: string
    valor: string
    tipoOferta: string
  }>({
    categoria: '',
    tamanho: '',
    numero: '',
    valor: '',
    tipoOferta: '',
  })

  // Função para redefinir os valores dos filtros
  const resetFilters = () => {
    setFilters({
      categoria: '',
      tamanho: '',
      numero: '',
      valor: '',
      tipoOferta: '',
    })
  }

  const tamanhoOptions = [
    {
      label: 'Menos de 100m²', // Display label
      min: null,
      max: '100',
    },
    {
      label: '100m² a 300m²',
      min: '100',
      max: '300',
    },
    {
      label: 'Mais de 300m²',
      min: '300',
      max: null,
    },
  ]

  const valorOptions = [
    {
      label: 'Menos de R$300,000',
      min: null,
      max: '300000',
    },
    {
      label: 'R$300,000 a R$1,000,000',
      min: '300000',
      max: '1000000',
    },
    {
      label: 'Mais de R$1,000,000',
      min: '1000000',
      max: null,
    },
  ]

  const processFilters = (filters: {
    categoria: string
    tamanho: string
    numero: string
    valor: string
  }) => {
    const tamanhoOption = tamanhoOptions.find(
      (option) => option.label === filters.tamanho
    )
    const valorOption = valorOptions.find(
      (option) => option.label === filters.valor
    )

    const processedFilters = {
      categoria: filters.categoria || null, // Ensure empty strings are converted to null
      minTamanho: tamanhoOption?.min || null,
      maxTamanho: tamanhoOption?.max || null,
      numQuartos: filters.numero || null,
      minValor: valorOption?.min || null,
      maxValor: valorOption?.max || null,
      tipoOferrta: filters.tiposOfertas || null,
    }

    // Remove null or undefined values from the object
    const notEmptyProcessedFilters = Object.fromEntries(
      Object.entries(processedFilters).filter(([_, value]) => value !== null)
    )

    return notEmptyProcessedFilters
  }

  const handleFiltrar = () => {
      const processedFilters = processFilters(filters)
    router.push(`/busca?${new URLSearchParams(processedFilters).toString()}`)
  }

  return (
    <div className="flex h-screen flex-col items-center bg-bege">
      <div className="p-[64px_24px] flex flex-col w-full justify-between">
        <div className="flex justify-end w-full mb-[16px]">
          <X size={24} className="" onClick={() => {router.back()}} />
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
            options={['Apartamento', 'Casa', 'Comercial']}
            placeholder="Categoria"
            value={filters.categoria}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, categoria: value.toString() }))
            }
          />
          <DropdownField
            name="tamanho"
            options={tamanhoOptions.map((option) => option.label)}
            placeholder="Tamanho"
            value={filters.tamanho}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, tamanho: value.toString() }))
            }
          />
          <DropdownField
            name="numero"
            options={['1', '2', '3', '4']}
            placeholder="Número de quartos"
            value={filters.numero}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, numero: value.toString() }))
            }
          />
          <DropdownField
            name="valor"
            options={valorOptions.map((option) => option.label)}
            placeholder="Valor"
            value={filters.valor}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, valor: value.toString() }))
            }
          />
          <DropdownField
            name="tipoOferta"
            options={valorOptions.map((option) => option.label)}
            placeholder="Tipo da Oferta"
            value={filters.valor}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, valor: value.toString() }))
            }
          />
          <CustomButton text="Filtrar" onClick={handleFiltrar} />
        </div>
      </div>
      <Footer activeState="Buscar" />
    </div>
  )
}
