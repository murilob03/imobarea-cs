import AgenteCard from '@/components/AgenteCard'
import { AgenteLer } from '@/types/usuarios'

export default function testPage() {
  const agente: AgenteLer = {
    id: '12344945649-651651651',
    name: 'John Doe',
    email: 'john@doe.com',
    cellphone: '11999999999',
    creci: '123456',
    cpf: '12345678901',
    createdAt: new Date(),
  }
  return (
    <div>
      <AgenteCard agente={agente} />
    </div>
  )
}
