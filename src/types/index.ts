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

export interface UserLer {
    id: string
    name: string
    email: string
    cellphone: string
    role: UserRole
    cpf?: string | null
    cnpj?: string | null
    creci?: string | null
    createdAt: Date
}
