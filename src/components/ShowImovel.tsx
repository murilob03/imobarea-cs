import React, { useState } from 'react';
import { ArrowLeft, Heart, MapPin } from 'lucide-react';
import SmallButton from './SmallButton';
import { LuBed, LuBriefcase, LuCar, LuRuler, LuUser } from "react-icons/lu";
import Image from 'next/image'
import { LuMessageCircle } from "react-icons/lu";
import Footer from './Footer';

interface ShowImovelProps {
  title: string;
  location: string;
  image: string;
  area: number;
  garage: number;
  bedrooms: number;
  builder: string;
  agent: string;
  type: "Apartamento" | "Casa" | "Comercial";
}

const ShowImovel: React.FC<ShowImovelProps> = ({
  title,
  location,
  image,
  area,
  garage,
  bedrooms,
  builder,
  agent,
  type
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isExpanded) {
    // Visão expandida ocupando a tela inteira
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="w-full h-full bg-bege overflow-y-auto relative">
          {/* Imagem ampliada */}
          <div className="relative w-full h-64">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <button
              className="absolute top-4 left-4 text-black"
              onClick={() => setIsExpanded(false)}
            >
              <ArrowLeft size={24} />
            </button>
          </div>
          {/* Informações detalhadas */}
          <div className="p-6">
            <SmallButton text={type} isSelected={true} />
            <h3 className="text-2xl font-bold text-gray-800 mt-[16px]">{title}</h3>
            <div className="mt-4 text-xs space-y-4">
              {/* Localização */}
              <p className="flex items-center">
                <MapPin size={16} className="mr-2 " />
                {location}
              </p>
              {/* Quartos */}
              <p className="flex items-center">
                <LuBed size={16} className="mr-2 " />
                Quartos: {bedrooms}
              </p>
              {/* Área Privativa */}
              <p className="flex items-center">
                <LuRuler size={16} className="mr-2 " />
                Área Privativa: {area}m²
              </p>
              {/* Garagem */}
              <p className="flex items-center">
                <LuCar size={16} className="mr-2 " />
                Vagas na garagem: {garage}
              </p>
              {/* Construtora */}
              <p className="flex items-center">
                <LuBriefcase size={16} className="mr-2 " />
                Construtora: {builder}
              </p>
              <label className="block font-bold">Agente Imobiliário Responsável</label>
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
                          <h1 className="text-base">Jean Lucas</h1>
                          <LuMessageCircle size={30} className="mr-2" />
                    </div>
              </div>
            </div>
          </div>
        </div>
        <Footer activeState="Início" />
      </div>
    );
  }

  // Visão compacta (original)
  return (
    <div
      className="w-[342px] h-[275px] rounded-3xl overflow-hidden relative bg-white shadow-lg cursor-pointer"
      onClick={() => setIsExpanded(true)}
    >
      {/* Imagem do imóvel */}
      <div className="relative w-full h-[235px]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {/* Ícone de favorito */}
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
          <Heart size={16} className="text-gray-600" />
        </div>
      </div>
      {/* Informações do imóvel sobrepondo parte da imagem */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-marrom to-marrom text-white p-4 h-[75px]">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold truncate">{title}</h3>
          <div className="flex items-center"></div>
        </div>
        <div className="flex items-center text-sm mt-1">
          <MapPin size={16} className="mr-1" />
          <p className="truncate text-xs">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowImovel;
