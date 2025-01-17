import { Endereco } from '@/types/endereco'

export interface ImovelCriar {
  nome: string
  areaPrivada: number
  numQuartos: number
  numVagas: number
  tipo: string
  endereco: Endereco

  imobiliariaId: string
  agenteId: string | null
}
