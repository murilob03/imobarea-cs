import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seeding...')

  // Create Clientes
  const cliente1 = await prisma.cliente.create({
    data: {
      user: {
        create: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          cellphone: '441234567890',
          password: '$2b$10$r07EqD6J.5ZNuDiHT1dBBOj3BlR8aenPIcx1590pefDL/RO1H7ogC',
          role: 'CLIENTE',
        },
      },
      cpf: '12345678901',
    },
  })

  const cliente2 = await prisma.cliente.create({
    data: {
      user: {
        create: {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          cellphone: '440987654321',
          password: '$2b$10$r07EqD6J.5ZNuDiHT1dBBOj3BlR8aenPIcx1590pefDL/RO1H7ogC',
          role: 'CLIENTE',
        },
      },
      cpf: '98765432109',
    },
  })

  // Create Imobiliarias and their Agentes
  const imobiliaria = await prisma.imobiliaria.create({
    data: {
      user: {
        create: {
          name: 'Imobiliaria XYZ',
          email: 'xyz@realty.com',
          cellphone: '445555555555',
          password: '$2b$10$r07EqD6J.5ZNuDiHT1dBBOj3BlR8aenPIcx1590pefDL/RO1H7ogC',
          role: 'IMOBILIARIA',
        },
      },
      cnpj: '12345678901234',
      agentes: {
        create: [
          {
            user: {
              create: {
                name: 'Agent 1',
                email: 'agent1@realty.com',
                cellphone: '444444444444',
                password: '$2b$10$r07EqD6J.5ZNuDiHT1dBBOj3BlR8aenPIcx1590pefDL/RO1H7ogC',
                role: 'AGENTE',
              },
            },
            cpf: '11122233344',
            creci: 'CRECI001',
          },
          {
            user: {
              create: {
                name: 'Agent 2',
                email: 'agent2@realty.com',
                cellphone: '443333333333',
                password: '$2b$10$r07EqD6J.5ZNuDiHT1dBBOj3BlR8aenPIcx1590pefDL/RO1H7ogC',
                role: 'AGENTE',
              },
            },
            cpf: '55566677788',
            creci: 'CRECI002',
          },
        ],
      },
    },
  })

  console.log({ cliente1, cliente2, imobiliaria })

  console.log('Finished seeding. 🌱')
}

main()
  .catch((e) => {
    console.error('Error while seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
