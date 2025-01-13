// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const users = [
  {
    role: 'CLIENTE',
    email: 'john.doe@example.com',
    senha: '$2b$10$r07EqD6J.5ZNuDiHT1dBBOj3BlR8aenPIcx1590pefDL/RO1H7ogC', // senha123
    nome: 'John Doe',
    celular: '4499123456789',
    cpf: '12312312312',
  },
  {
    role: 'ADMIN',
    email: 'jane.smith@example.com',
    senha: '$2b$10$r07EqD6J.5ZNuDiHT1dBBOj3BlR8aenPIcx1590pefDL/RO1H7ogC',
    nome: 'Jane Smith',
    celular: '4489123456789',
    cpf: '12312312312',
  },
  {
    role: 'AGENTE',
    email: 'alice.jones@example.com',
    senha: '$2b$10$r07EqD6J.5ZNuDiHT1dBBOj3BlR8aenPIcx1590pefDL/RO1H7ogC',
    nome: 'Alice Jones',
    celular: '4479123456789',
    cpf: '12312312312',
    creci: '12312312312',
  },
  {
    role: 'IMOBILIARIA',
    email: 'imobas.imobas@example.com',
    senha: '$2b$10$r07EqD6J.5ZNuDiHT1dBBOj3BlR8aenPIcx1590pefDL/RO1H7ogC',
    celular: '4469123456789',
    nome: 'Imobas',
    cnpj: '12312312312',
  },
]

async function seedData() {
  console.log('Seeding...')

  for (const user of users) {
    const result = await prisma.user.create({
      data: user,
    })
    console.log(`Created user with id: ${result.id}`)
  }

  console.log('Finished seeding.')
}

seedData()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
