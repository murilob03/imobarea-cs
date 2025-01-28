// components/EditImovel.js

import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

const EditImovel = ({ imovel }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    if (!imovel) {
        return <p>Carregando...</p>;
    }

    return (
        <div
            className={`relative flex flex-col items-center justify-center rounded-2xl transition-all duration-300 ${
                isExpanded ? 'bg-marrom_claro text-black p-6' : 'bg-bege text-black p-4'
            }`}
        >
            {/* Botão principal */}
            <button
                onClick={handleToggle}
                className="w-full flex py-4 gap-4 items-stretch transition-colors duration-300"
            >
                <img src="/noah.jpg" alt="imagem do imóvel" className="rounded-lg w-[120px] h-[120px]" />
                <div className="flex py-3 w-full h-auto flex-col items-start justify-between">
                    <p className="bg-marrom text-[12px] inline-flex rounded-full w-auto h-auto px-3 py-1 text-white">
                        {imovel.tipo}
                    </p>
                    <h3 className="font-bold">{imovel.nome}</h3>
                    <div className="flex flex-col items-start">
                        <div className="flex gap-2">
                            <MapPin size={20} className="flex-shrink-0 p-1" />
                            <div className="flex flex-col flex-shrink-0 items-start">
                                <p className="text-[12px]">
                                    {imovel.endereco.logradouro}, {imovel.endereco.numero}
                                </p>
                                <p className="text-[12px]">
                                    {imovel.endereco.cidade}, {imovel.endereco.estado}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </button>

            {/* Botões adicionais, aparecem somente quando expandido */}
            {isExpanded && (
                <div className="flex w-full flex-shrink-0 gap-3">
                    <button className="flex w-full py-3 justify-center bg-white rounded-full shadow-md">
                        Excluir
                    </button>
                    <button className="flex w-full py-3 justify-center bg-marrom rounded-full text-white shadow-md">
                        Editar
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditImovel;