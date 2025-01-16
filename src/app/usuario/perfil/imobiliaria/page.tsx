'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import CustomButton from '@/components/CustomButton'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Footer from '@/components/Footer'

export default function PerfilImobiliaria() {
  return (
    <div className="flex flex-col items-center p-6 w-full h-screen justify-between">
      {/* Conteúdo Superior */}
      <div className="flex flex-col gap-6 w-full">
        <a href="/usuario/inicio">
          <ArrowLeft size={32} color="black" />
        </a>
        <div className="flex flex-col items-center gap-5">
          <Image
            src="/opcaologo.png"
            alt="Logo da Imobiliaria"
            style={{
              border: '5px solid #9D6F4D',
              borderRadius: '50%',
            }}
            width={150}
            height={150}
          />
          <div className="flex flex-col items-center gap-2">
            <h1>Opção Imóveis</h1>
            <p>Imobiliária</p>
          </div>
          <p>Maringá, Paraná</p>
          <div className="flex flex-row items-center gap-1">
            <p>4,0</p>
            <Star size="16" />
          </div>
        </div>
      </div>

      {/* Botões */}
      <CustomButton text="Visualizar agentes cadastrados" href="/" />
      <CustomButton text="Visualizar imóveis" href="/" />

      {/* Rodapé */}
      <Footer />
    </div>
  )
}
