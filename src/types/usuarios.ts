export interface ClienteLer {
  id: string
  name: string
  email: string
  cpf: string
  cellphone: string
  createdAt: Date
}

export interface AgenteLer extends ClienteLer {
  creci: string
}
