import React, { useState } from 'react'
import { Home, Heart, Search, MessageCircle, User } from 'lucide-react'

const Footer = () => {
  const [active, setActive] = useState('Início') // Estado para rastrear a tela ativa

  return (
    <div className="flex justify-around items-center w-[342px] h-[67px]">
      {/* Início */}
      <a
        href="/usuario/inicio"
        className={`flex flex-col items-center ${
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
        className={`flex flex-col items-center ${
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
        className={`flex flex-col items-center ${
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
        className={`flex flex-col items-center ${
          active === 'Chat' ? 'text-marrom' : 'text-black-600'
        }`}
        onClick={() => setActive('Chat')}
      >
        <MessageCircle size={40} />
        <span className="text-base mt-1">Chat</span>
      </a>

      {/* Perfil */}
      <a
        href="/usuario/perfil"
        className={`flex flex-col items-center ${
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
