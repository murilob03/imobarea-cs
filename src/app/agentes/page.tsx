'use client'

import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import CustomButton from '@/components/CustomButton'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import EditAgente from '@/components/EditAgente'
import { useSession } from 'next-auth/react'
import { UserRole } from '@/types'
import Link from 'next/link'
import AgenteCard from '@/components/AgenteCard'

export default async function ListarAgentesCadastrados() {
  const { data: session } = useSession()

  if (!session) {
    return <p>Loading...</p>
  } else if (session.user.role !== UserRole.IMOBILIARIA) {
    return (
      <p className="text-red-500">
        Você não tem permissão para acessar esta página!
      </p>
    )
  }

  let agentes = []

  try {
    agentes = await fetch('/api/agente').then((res) => res.json())
  } catch (error) {
    console.error(error)
  }

  return (
    <div className="flex p-[64px_24px] mb-[100px] flex-col items-center gap-8 w-full justify-between">
      {/* Conteúdo Superior */}
      <div className="flex gap-6 items-center w-full">
        <Link href="/usuario/inicio">
          <ArrowLeft size={32} color="black" />
        </Link>
        <h1 className="">Agentes Cadastrados</h1>
      </div>

      {/* Lista de Agentes */}
      <div className="flex flex-col gap-6 w-full">
        {agentes.map((agente) => (
          <span>{agente.name}</span>
        ))}
      </div>

      <CustomButton
        text="Adicionar novo agente"
        href="/imobiliaria/associar-agentes
      "
      />
      <Footer activeState="Perfil" />
    </div>
  )
}
