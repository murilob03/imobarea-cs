import { Endereco } from '@/types/endereco'
import { AgenteLer } from './usuarios'
import { UserLer } from '.'

export interface ImovelCriar {
  nome: string
  areaPrivada: number
  numQuartos: number
  numVagas: number
  tipo: string
  endereco: Endereco
  agente: any
  imobiliaria: any

  imobiliariaId: string
  agenteId: string | null
}

export interface ImovelLer extends ImovelCriar {
  id: string
}
