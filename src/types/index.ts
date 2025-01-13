export enum UserRole {
  CLIENTE = 'CLIENTE',
  ADMIN = 'ADMIN',
  IMOBILIARIA = 'IMOBILIARIA',
  AGENTE = 'AGENTE',
}

export interface UserCriar {
  name: string
  email: string
  cellphone: string
  password: string
  cpf?: string
  cnpj?: string
  creci?: string
  role: UserRole
}
