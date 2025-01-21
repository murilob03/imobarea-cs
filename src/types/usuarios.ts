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
  imobiliariaId: string | null
}

export interface ImovelLer {
  id: string
  title: string
  location: string
  image: string
  area: number
  garage: number
  bedrooms: number
  builder: string
  agent: string
  type: 'Apartamento' | 'Casa' | 'Comercial'
  image_agent: string
}
