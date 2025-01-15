import React from "react";
import { Star, Heart, MapPin } from "lucide-react";

interface ShowImovelProps {
  title: string;
  location: string;
  image: string;
  area: number;
  garage: number;
  bedrooms: number;
  builder: string;
}

const ShowImovel: React.FC<ShowImovelProps> = ({
  title,
  location,
  image,
  area,
  garage,
  bedrooms,
  builder,
}) => {
  return (
    <div className="w-[342px] h-[275px] rounded-3xl overflow-hidden relative bg-white shadow-lg">
      {/* Imagem do imóvel */}
      <div className="relative w-full h-[235px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Ícone de favorito */}
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
          <Heart size={16} className="text-gray-600" />
        </div>
      </div>
      {/* Informações do imóvel sobrepondo parte da imagem */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-marrom to-marrom text-white p-4 h-[75px]">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold truncate">{title}</h3>
          <div className="flex items-center">
          </div>
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
