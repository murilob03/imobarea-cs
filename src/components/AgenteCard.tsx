import { AgenteLer } from '@/types/usuarios'
import Image from 'next/image'

interface AgenteCardProps {
  agente: AgenteLer
}

const AgenteCard = ({ agente }: AgenteCardProps) => {
  return (
    <div className="relative flex items-center border w-full h-[92px] bg-bege border-solid border-black rounded-2xl p-4 gap-4">
      <Image
        src="/koreano.png"
        alt={agente.name}
        width={64}
        height={64}
        className="w-16 h-16 rounded-full"
      />
      
      <div className="flex flex-col">
        <p className="text-sm font-bold text-black">{agente.name}</p>
        <p className="text-sm text-black">CRECI: {agente.creci}</p>
      </div>
    </div>
  )
}

export default AgenteCard
