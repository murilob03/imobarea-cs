import { Endereco } from '@/types/endereco'
import { AgenteLer } from './usuarios'
import { UserLer } from '.'

export interface ImovelCriar {
  nome: string
  areaPrivada: number
  numQuartos: number
  numVagas: number
  tipo: string // TODO: Criar enum para tipo de imóvel
  endereco: Endereco
  // agente: any
  // imobiliaria: any
  valor: number
  tipoOferta: string // TODO: Criar enum para tipo de oferta

  imobiliariaId: string
  agenteId: string | null
}

export interface ImovelLer extends ImovelCriar {
  id: string
}
