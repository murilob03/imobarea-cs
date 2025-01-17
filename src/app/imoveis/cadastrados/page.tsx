'use client'

import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import CustomButton from '@/components/CustomButton'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import ShowImovel from '@/components/ShowImovel'
import EditImovel from '@/components/EditImovel'

export default function PerfilImobiliaria() {
  return (
    <div className="flex p-[64px_24px] flex-col items-center gap-8 w-full justify-between">
      {/* Conteúdo Superior */}
      <div className="flex gap-6 items-center w-full">
        <a href="/usuario/inicio">
          <ArrowLeft size={32} color="black" />
        </a>
        <h1 className="">Imóveis Cadastrados</h1>
      </div>
      
      <EditImovel />
      <Footer activeState="Perfil" />
    </div>
  )
}
