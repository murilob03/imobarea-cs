import React from "react";
import { Star, Heart, MapPin } from "lucide-react"; // Ícones da biblioteca lucide-react

interface ShowImovelProps {
  title: string; // Nome do imóvel
  location: string; // Localização do imóvel
  rating: number; // Avaliação do imóvel
  image: string; // URL da imagem do imóvel
}

const ShowImovel: React.FC<ShowImovelProps> = ({
  title,
  location,
  rating,
  image,
}) => {
  return (
    <div className="w-[342px] h-[235px] rounded-3xl overflow-hidden relative bg-white">
      {/* Imagem do imóvel */}
      <div className="relative w-full h-[140px]">
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
      {/* Informações do imóvel */}
      <div className="p-4 bg-[#9D6F4D] text-white">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold truncate">{title}</h3>
          <div className="flex items-center">
            <Star className="text-yellow-400" />
            <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center text-sm mt-1">
          <MapPin className="mr-1" />
          <p className="truncate">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowImovel;
