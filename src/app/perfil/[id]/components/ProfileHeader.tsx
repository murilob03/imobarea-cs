import Image from 'next/image'
import { Star } from 'lucide-react'

interface ProfileHeaderProps {
  nome: string
  imagem: string
  avaliacao: number
  cidade: string
  estado: string
  agente?: {
    nomeImobiliaria: string
  }
  isImobiliaria: boolean
}

export default function ProfileHeader({
  nome,
  imagem,
  avaliacao,
  cidade,
  estado,
  isImobiliaria,
  agente,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      <Image
        src={imagem}
        alt="Foto do agente"
        style={{
          border: '5px solid #9D6F4D',
          borderRadius: '50%',
        }}
        width={150}
        height={150}
      />
      <div className="flex flex-col items-center gap-2">
        <h1>{nome}</h1>
        {agente ? <p>Agente Imobiliário - {agente.nomeImobiliaria}</p> : null}
        {isImobiliaria ? <p>Imobiliária</p> : null}
      </div>
      <p>
        {cidade}, {estado}
      </p>
      {agente || isImobiliaria ? (
        <div className="flex flex-row items-center gap-1">
          <p>{avaliacao}</p>
          <Star size="16" />
        </div>
      ) : null}
    </div>
  )
}
