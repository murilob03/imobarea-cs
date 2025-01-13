'use client'

import { useRouter } from 'next/navigation'
import SmallButton from '@/components/SmallButton'
import InputField from '@/components/InputField'
import { LuSearch } from 'react-icons/lu'
import Footer from '@/components/Footer'
import ShowImovel from '@/components/ShowImovel'

export default function Home() {
  const router = useRouter();

  // Dados de exemplo dos imóveis
  const imoveis = [
    {
      id: 1,
      title: "Noah",
      location: "Tiradentes - zona 1, Maringá - PR",
      rating: 4.0,
      image: "https://via.placeholder.com/342x140", // Substituir pela URL real da imagem
    },
    {
      id: 2,
      title: "Aurora",
      location: "Zona 2, Maringá - PR",
      rating: 4.5,
      image: "https://via.placeholder.com/342x140",
    },
    {
      id: 3,
      title: "Solaris",
      location: "Centro, Curitiba - PR",
      rating: 4.8,
      image: "https://via.placeholder.com/342x140",
    },
    // Adicione mais imóveis conforme necessário
  ];

  return (
    <div className="flex h-screen flex-col items-center bg-bege">
      <div className="p-[64px_24px] flex flex-col w-full h-full justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-[48px]">
            Encontre seu <br />
            imóvel dos sonhos
          </h1>
          <div className="flex items-center relative">
            <InputField
              label=""
              type="string"
              name="creci"
              placeholder="Qual região você está procurando?"
              required
              className="pl-14 placeholder:text-black text-base"
            />
            <LuSearch size={24} className="absolute left-6" />
          </div>
          <div className="mt-[32px] flex gap-4">
            {/* Botões dinâmicos */}
            <SmallButton text="Apartamento" />
            <SmallButton text="Casas" />
            <SmallButton text="Comercial" />
          </div>
          <h1 className="text-2xl font-bold mt-[32px] mb-[24px]">
            Populares
          </h1>

          {/* Div de imóveis populares com margem acima e abaixo */}
          <div className="flex flex-wrap gap-4 overflow-y-auto max-h-[calc(100vh-350px)] w-full my-6">
            {imoveis.map((imovel) => (
              <ShowImovel
                key={imovel.id}
                title={imovel.title}
                location={imovel.location}
                rating={imovel.rating}
                image={imovel.image}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
