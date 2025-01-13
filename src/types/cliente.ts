export interface ClienteCriar {
  nome: string
  email: string
  senha: string
  cpf: string
  celular: string
  role: 'CLIENTE'
}

export interface ClienteLer {
  id: string
  nome: string
  email: string
  cpf: string | null
  celular: string
}
