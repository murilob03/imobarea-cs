'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import CustomButton from '@/components/CustomButton'
import Footer from '@/components/Footer'
import ShowImovel from '@/components/ShowImovel'
import Link from 'next/link'
import ProfileHeader from './components/ProfileHeader'
import { ImovelLer } from '@/types/imovel'
import { useParams, useRouter } from 'next/navigation'
import { UsuarioLer } from '@/types/usuarios'
import { signOut, useSession } from 'next-auth/react'

export default function Perfil() {
  const { data: session } = useSession()
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [imoveis, setImoveis] = useState<ImovelLer[]>([])
  const [usuario, setUsuario] = useState<UsuarioLer | null>(null)
  const [loading, setLoading] = useState(true)

  const isOwner = session?.user.id === params.id

  // Fetch the user data
  const fetchUsuario = async () => {
    try {
      const res = await fetch(`/api/usuario?query=id:${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setUsuario(data[0] || null)
    } catch (err) {
      console.error(err)
    }
  }

  // Fetch the properties data
  const fetchImoveis = async () => {
    try {
      const res = await fetch('/api/imoveis', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setImoveis(data || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    // Fetch the user on component mount or when `params.id` changes
    const fetchData = async () => {
      setLoading(true)
      await fetchUsuario()
      setLoading(false)
    }
    fetchData()
  }, [params.id])

  useEffect(() => {
    // Fetch properties if the user has a role that requires it
    if (session?.user.role === 'CLIENTE' || session?.user.role === 'AGENTE') {
      console.log('fetching imoveis')
      fetchImoveis()
    }
  }, [usuario, session?.user.role])

  if (loading) {
    return <p>Loading...</p>
  }

  if (!usuario) {
    return <p>User not found</p>
  }

  let imagem = ''
  let isImobiliaria = false
  switch (usuario.role) {
    case 'IMOBILIARIA':
      imagem = '/imobile.png'
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
          nome={usuario.name ?? ''}
          imagem={imagem}
          avaliacao={4.0}
          cidade={'Maringá'}
          estado={'PR'}
          isImobiliaria={isImobiliaria}
          agente={
            usuario.role === 'AGENTE'
              ? { nomeImobiliaria: 'Imobilearea' }
              : undefined
          }
        />

        {isOwner ? (
          <>
            {session?.user.role === 'CLIENTE' ? (
              <h1 className="text-base mt-[48px]">
                Imóveis vistos recentemente
              </h1>
            ) : null}

            {session?.user.role === 'AGENTE' ? (
              <h1 className="text-base mt-[48px]">Projetos</h1>
            ) : null}

            {session?.user.role === 'IMOBILIARIA' ? (
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
          </>
        ) : null}
      </div>

      {isOwner ? (
        <button
          className="flex justify-center items-center text-xs rounded-full transition-all duration-300 bg-marrom"
          onClick={handleSignOut}
        >
          <p className="text-white font-bold px-8 py-2">Sair</p>
        </button>
      ) : null}

      <Footer activeState="Perfil" />
    </div>
  )
}
