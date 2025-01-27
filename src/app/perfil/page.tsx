'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import CustomButton from '@/components/CustomButton'
import Footer from '@/components/Footer'
import ShowImovel from '@/components/ShowImovel'
import Link from 'next/link'
import ProfileHeader from './components/ProfileHeader'
import { useSession, signOut } from 'next-auth/react'
import { ImovelLer } from '@/types/imovel'


export default function Perfil() {
  const { data: session } = useSession()
  const [imoveis, setImoveis] = useState([] as ImovelLer[])
  const router = useRouter()

  const isLoading = !session

  useEffect(() => {
    if (session?.user?.role === 'CLIENTE' || session?.user?.role === 'AGENTE') {
      fetch('/api/imoveis', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setImoveis(data)
        })
        .catch((err) => console.error(err))
    }
  }, [session?.user?.role])

  if (isLoading) {
    return <p>Loading...</p>
  }

  let imagem = ''
  let isImobiliaria = false
  switch (session.user.role) {
    case 'IMOBILIARIA':
      imagem = '/opcaologo.png'
      isImobiliaria = true
      break
    case 'AGENTE':
      imagem = '/koreano.png'
      break
    case 'CLIENTE':
      imagem = '/koreano.png'
      break
    default:
      break
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false }) // Desabilitar o redirecionamento automático do NextAuth
    router.push('/login') // Redirecionar manualmente para /login
  }

  return (
    <div className="flex p-[64px_24px] flex-col items-center gap-8 w-full justify-between pb-[148px]">
      {/* Conteúdo Superior */}
      <div className="flex flex-col gap-6 w-full">
        <Link href="/inicio">
          <ArrowLeft size={32} color="black" />
        </Link>
        <ProfileHeader
          nome={session.user.name ?? ''}
          imagem={imagem}
          avaliacao={4.0}
          cidade={'Maringá'}
          estado={'PR'}
          isImobiliaria={isImobiliaria}
          agente={
            session.user.role === 'AGENTE'
              ? { nomeImobiliaria: 'Imobilearea' }
              : undefined
          }
        />

        {session.user.role === 'CLIENTE' ? (
          <h1 className="text-base mt-[48px]">Imóveis vistos recentemente</h1>
        ) : null}

        {session.user.role === 'AGENTE' ? (
          <h1 className="text-base mt-[48px]">Projetos</h1>
        ) : null}

        {session.user.role === 'IMOBILIARIA' ? (
          <>
            <CustomButton
              text="Visualizar agentes cadastrados"
              href="/agentes"
            />
            <CustomButton text="Visualizar imóveis" href="/imoveis" />
          </>
        ) : null}

        {imoveis.length > 1 ? (
          <>
            <ShowImovel imovel={imoveis[0]} />
            <ShowImovel imovel={imoveis[1]} />
          </>
        ) : null}
      </div>
      <button
        className="flex justify-center items-center text-xs rounded-full transition-all duration-300 bg-marrom"
        onClick={handleSignOut}
      >
        <p className="text-white font-bold px-8 py-2">Sair</p>
      </button>
      <Footer activeState="Perfil" />
    </div>
  )
}
