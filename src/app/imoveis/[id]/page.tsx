'use client'

import Image from 'next/image'
import { Bed, Briefcase, Car, MapPin, MessageCircle, Ruler } from 'lucide-react'
import SmallButton from '@/components/SmallButton'
import Footer from '@/components/Footer'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ImovelLer } from '@/types/imovel'

export default function ImovelPage() {
  const params = useParams<{ id: string }>()
  const [imovel, setImovel] = useState({} as ImovelLer)

  useEffect(() => {
    const fetchImovel = async () => {
      const response = await fetch(`/api/imoveis/?query=id:${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch imovel')
      }

      const data = await response.json()
      setImovel(data[0])
      console.log(data[0])
    }

    fetchImovel()
  }, [params.id])

  if (!imovel.id) {
    return <p>Loading imovel...</p>
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-full h-full bg-bege overflow-y-auto relative">
        <div className="relative w-full h-64">
          <Image
            src="/noah.jpg"
            alt="Foto do imóvel"
            width={342}
            height={235}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex gap-4">
            <div className="flex justify-center items-center text-xs rounded-full bg-transparent text-black border border-black w-[108.67px] h-[45px]">
              {imovel.tipo}
            </div>
            <div className="flex justify-center items-center text-xs rounded-full bg-transparent text-black border border-black w-[108.67px] h-[45px]">
              {imovel.tipoOferta}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-800 mt-[16px]">
              {imovel.nome}
            </h3>
            <h3 className="text-2xl mt-[16px]">R${imovel.valor}</h3>
          </div>
          <div className="mt-4 text-xs space-y-4">
            <p className="flex items-center">
              <MapPin size={16} className="mr-2 " />
              {imovel.endereco.logradouro} {imovel.endereco.numero},{' '}
              {imovel.endereco.cidade} - {imovel.endereco.estado}
            </p>
            <p className="flex items-center">
              <Bed size={16} className="mr-2 " />
              Quartos: {imovel.numQuartos}
            </p>
            <p className="flex items-center">
              <Ruler size={16} className="mr-2 " />
              Área Privativa: {imovel.areaPrivada}m²
            </p>
            <p className="flex items-center">
              <Car size={16} className="mr-2 " />
              Vagas na garagem: {imovel.numVagas}
            </p>
            <p className="flex items-center">
              <Briefcase size={16} className="mr-2 " />
              Imobiliária: {imovel.imobiliaria.user.name}
            </p>
            <label className="block font-bold">
              Agente Imobiliário Responsável
            </label>
            <div className="bg-marrom w-[342px] h-[84px] pt-3 rounded-2xl justify-between ">
              <div className="flex flex-row gap-3 items-center justify-between ml-2">
                <Image
                  src="/koreano.png"
                  alt="Foto do agente"
                  style={{
                    border: '5px solid #9D6F4D',
                    borderRadius: '50%',
                  }}
                  width={60}
                  height={60}
                />
                <h1 className="text-base">{imovel.agente.user.name}</h1>
                <MessageCircle size={30} className="mr-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer activeState="Início" />
    </div>
  )
}
