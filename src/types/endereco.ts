export interface Endereco {
  cep: number,
  logradouro: string
  numero: number
  bairro: string
  complemento: string | null
  cidade: string
  estado: string
}
