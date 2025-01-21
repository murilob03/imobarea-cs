import React, { useState } from 'react'
import { ArrowLeft, Heart, MapPin } from 'lucide-react'
import SmallButton from './SmallButton'
import { Bed, Briefcase, Car, Ruler } from 'lucide-react'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import Footer from './Footer'
import { ImovelLer } from '@/types/usuarios' // Importamos a nova interface

interface ShowImovelProps {
  imovel: ImovelLer // Usamos a interface
}

const ShowImovel: React.FC<ShowImovelProps> = ({ imovel }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="w-full h-full bg-bege overflow-y-auto relative">
          <div className="relative w-full h-64">
            <img
              src={imovel.image}
              alt={imovel.title}
              className="w-full h-full object-cover"
            />
            <button
              className="absolute top-4 left-4 text-black"
              onClick={() => setIsExpanded(false)}
            >
              <ArrowLeft size={24} />
            </button>
          </div>
          <div className="p-6">
            <SmallButton text={imovel.type} isSelected={true} />
            <h3 className="text-2xl font-bold text-gray-800 mt-[16px]">
              {imovel.title}
            </h3>
            <div className="mt-4 text-xs space-y-4">
              <p className="flex items-center">
                <MapPin size={16} className="mr-2 " />
                {imovel.location}
              </p>
              <p className="flex items-center">
                <Bed size={16} className="mr-2 " />
                Quartos: {imovel.bedrooms}
              </p>
              <p className="flex items-center">
                <Ruler size={16} className="mr-2 " />
                Área Privativa: {imovel.area}m²
              </p>
              <p className="flex items-center">
                <Car size={16} className="mr-2 " />
                Vagas na garagem: {imovel.garage}
              </p>
              <p className="flex items-center">
                <Briefcase size={16} className="mr-2 " />
                Construtora: {imovel.builder}
              </p>
              <label className="block font-bold">
                Agente Imobiliário Responsável
              </label>
              <div className="bg-marrom w-[342px] h-[84px] pt-3 rounded-2xl justify-between ">
                <div className="flex flex-row gap-3 items-center justify-between ml-2">
                  <Image
                    src={imovel.image_agent}
                    alt="Foto do agente"
                    style={{
                      border: '5px solid #9D6F4D',
                      borderRadius: '50%',
                    }}
                    width={60}
                    height={60}
                  />
                  <h1 className="text-base">{imovel.agent}</h1>
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

  return (
    <div
      className="w-[342px] h-[275px] rounded-3xl overflow-hidden relative bg-white shadow-lg cursor-pointer"
      onClick={() => setIsExpanded(true)}
    >
      <div className="relative w-full h-[235px]">
        <img
          src={imovel.image}
          alt={imovel.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
          <Heart size={16} className="text-gray-600" />
        </div>
      </div>
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-marrom to-marrom text-white p-4 h-[75px]">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold truncate">{imovel.title}</h3>
        </div>
        <div className="flex items-center text-sm mt-1">
          <MapPin size={16} className="mr-1" />
          <p className="truncate text-xs">{imovel.location}</p>
        </div>
      </div>
    </div>
  )
}

export default ShowImovel
