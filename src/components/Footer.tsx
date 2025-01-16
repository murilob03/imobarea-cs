import React, { useEffect, useState } from 'react'
import { Home, Heart, Search, MessageCircle, User } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface FooterProps {
  activeState: string;  // Adicionando a prop activeState
}

const Footer = ({ activeState }: FooterProps) => {
  const [active, setActive] = useState('Início') // Estado para rastrear a tela ativa
  const { data: session } = useSession()
  const role = session?.user?.role // Obtém a role do usuário autenticado
  let destination = '/login' // Valor padrão para usuários não autenticados

  if (role === 'AGENTE') destination = '/usuario/perfil/agente'
  else if (role === 'IMOBILIARIA') destination = '/usuario/perfil/imobiliaria'
  else if (role === 'CLIENTE') destination = '/usuario/perfil/cliente'

  return (
    <div className="flex justify-between items-center w-full h-[67px] mb-[32px]">
      {/* Início */}
      <a
        href="/usuario/inicio"
        className={`flex w-[40px] text-center justify-center flex-col items-center ${
          activeState === 'Início' ? 'text-marrom' : 'text-black-600'
        }`}
      >
        <Home size={40} />
        <span className="text-base mt-1">Início</span>
      </a>

      {/* Favoritos */}
      <a
        href="/usuario/favoritos"
        className={`flex w-[40px] text-center justify-center flex-col items-center ${
          activeState === 'Favoritos' ? 'text-marrom' : 'text-black-600'
        }`}
      >
        <Heart size={40} />
        <span className="text-base mt-1">Favoritos</span>
      </a>

      {/* Buscar */}
      <a
        href="/usuario/busca"
        className={`flex w-[40px] text-center justify-center flex-col items-center ${
          activeState === 'Buscar' ? 'text-marrom' : 'text-black-600'
        }`}
      >
        <Search size={40} />
        <span className="text-base mt-1">Buscar</span>
      </a>

      {/* Chat */}
      <a
        href="/usuario/chat"
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
