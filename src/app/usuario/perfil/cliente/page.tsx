'use client'

import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import CustomButton from '@/components/CustomButton'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import ShowImovel from '@/components/ShowImovel'

export default function PerfilCliente() {
  return (
    <div className="flex p-[64px_24px] flex-col items-center gap-8 w-full justify-between">
      {/* Conteúdo Superior */}
      <div className="flex flex-col gap-6 w-full">
        <a href="/usuario/inicio">
          <ArrowLeft size={24} color="black" />
        </a>
        <div className="flex flex-col items-center gap-5">
          <Image
            src="/koreano.png"
            alt="Foto do agente"
            style={{
              border: '5px solid #9D6F4D',
              borderRadius: '50%',
            }}
            width={150}
            height={150}
          />
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl">Jean Lucas</h1>
          </div>
          <p>Maringá, Paraná</p>
        </div>
        <h1 className="text-base mt-[48px]">Imóveis vistos recentemente</h1>
      </div>

      {/* Botões */}
      <ShowImovel
              title={"teste"}
              location={"teste"}
              image={"teste.png"}
              area={100}
              garage={2}
              bedrooms={3}
              builder="Construtora XYZ"
            />

      {/* Rodapé */}
      <Footer activeState="Perfil" />
    </div>
  )
}
