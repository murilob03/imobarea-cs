'use client'

import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import CustomButton from '@/components/CustomButton'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import ShowImovel from '@/components/ShowImovel'

export default function PerfilImobiliaria() {
  return (
    <div className="flex p-[64px_24px] flex-col items-center gap-8 w-full justify-between">
      {/* Conteúdo Superior */}
      <div className="flex flex-col gap-6 w-full">
        <a href="/inicio">
          <ArrowLeft size={32} color="black" />
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
            <h1>Jean Lucas</h1>
            <p>
              Agente Imobiliário -{' '}
              <a href="/inicio/imobiliaria" className="text-marrom">
                Opção Imóveis
              </a>
            </p>
          </div>
          <p>Maringá, Paraná</p>
          <div className="flex flex-row items-center gap-1">
            <p>4,0</p>
            <Star size="16" />
          </div>
        </div>
        <h1 className="">Projetos</h1>
      </div>

      {/* Botões */}
      {/* <ShowImovel />
      <ShowImovel />
      <ShowImovel />
      <ShowImovel /> */}

      {/* Rodapé */}
      <Footer activeState="Perfil" />
    </div>
  )
}
