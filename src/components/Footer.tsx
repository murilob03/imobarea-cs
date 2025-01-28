import React, { useEffect, useState } from 'react'
import { Home, Heart, Search, MessageCircle, User } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface FooterProps {
  activeState: string // Adicionando a prop activeState
}

const Footer = ({ activeState }: FooterProps) => {
  const [active, setActive] = useState('Início') // Estado para rastrear a tela ativa
  const { data: session } = useSession()
  const role = session?.user?.role // Obtém a role do usuário autenticado
  let destination = '/login' // Valor padrão para usuários não autenticados

  if (session) destination = '/perfil'

  return (
    <div className="fixed bottom-0 bg-bege flex justify-between items-center w-[390px] p-8">
      {/* Início */}
      <a
        href="/inicio"
        className={`flex w-[40px] text-center justify-center flex-col items-center ${
          activeState === 'Início' ? 'text-marrom' : 'text-black-600'
        }`}
      >
        <Home size={40} />
        <span className="text-base mt-1">Início</span>
      </a>

      {/* Favoritos */}
      <a
        href="/favoritos"
        className={`flex w-[40px] text-center justify-center flex-col items-center ${
          activeState === 'Favoritos' ? 'text-marrom' : 'text-black-600'
        }`}
      >
        <Heart size={40} />
        <span className="text-base mt-1">Favoritos</span>
      </a>

      {/* Buscar */}
      <a
        href="/busca"
        className={`flex w-[40px] text-center justify-center flex-col items-center ${
          activeState === 'Buscar' ? 'text-marrom' : 'text-black-600'
        }`}
      >
        <Search size={40} />
        <span className="text-base mt-1">Buscar</span>
      </a>

      {/* Chat */}
      <a
        href="/chat"
        className={`flex w-[40px] text-center justify-center flex-col items-center ${
          activeState === 'Chat' ? 'text-marrom' : 'text-black-600'
        }`}
      >
        <MessageCircle size={40} />
        <span className="text-base mt-1">Chat</span>
      </a>

      {/* Perfil */}
      <a
        href={destination}
        className={`flex w-[40px] text-center justify-center flex-col items-center ${
          activeState === 'Perfil' ? 'text-marrom' : 'text-black-600'
        }`}
      >
        <User size={40} />
        <span className="text-base mt-1">Perfil</span>
      </a>
    </div>
  )
}

export default Footer
