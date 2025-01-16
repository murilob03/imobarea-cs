import React, { useEffect, useState } from 'react'
import { Home, Heart, Search, MessageCircle, User } from 'lucide-react'
import { useSession } from 'next-auth/react'

const Footer = () => {
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
        className={`flex w-[40px] flex-col items-center ${
          active === 'Início' ? 'text-marrom' : 'text-black-600'
        }`}
        onClick={() => setActive('Início')}
      >
        <Home size={40} />
        <span className="text-base mt-1">Início</span>
      </a>

      {/* Favoritos */}
      <a
        href="/usuario/favoritos"
        className={`flex w-[40px] flex-col items-center ${
          active === 'Favoritos' ? 'text-marrom' : 'text-black-600'
        }`}
        onClick={() => setActive('Favoritos')}
      >
        <Heart size={40} />
        <span className="text-base mt-1">Favoritos</span>
      </a>

      {/* Buscar */}
      <a
        href="/usuario/busca"
        className={`flex w-[40px] flex-col items-center ${
          active === 'Buscar' ? 'text-marrom' : 'text-black-600'
        }`}
        onClick={() => setActive('Buscar')}
      >
        <Search size={40} />
        <span className="text-base mt-1">Buscar</span>
      </a>

      {/* Chat */}
      <a
        href="/usuario/chat"
        className={`flex w-[40px] flex-col items-center ${
          active === 'Chat' ? 'text-marrom' : 'text-black-600'
        }`}
        onClick={() => setActive('Chat')}
      >
        <MessageCircle size={40} />
        <span className="text-base mt-1">Chat</span>
      </a>

      {/* Perfil */}
      <a
        href={destination}
        className={`flex w-[40px] flex-col items-center ${
          active === 'Perfil' ? 'text-marrom' : 'text-black-600'
        }`}
        onClick={() => setActive('Perfil')}
      >
        <User size={40} />
        <span className="text-base mt-1">Perfil</span>
      </a>
    </div>
  )
}

export default Footer
