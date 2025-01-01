const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const users = [
    {
        role: "USER",
        email: "john.doe@example.com",
        password: "$2b$10$r07EqD6J.5ZNuDiHT1dBBOj3BlR8aenPIcx1590pefDL/RO1H7ogC", // senha123
        name: "John Doe",
        cellphone: "99123456789",
        cpf: "12312312312",
      },
      {
        role: "ADMIN",
        email: "jane.smith@example.com",
        password: "$2b$10$r07EqD6J.5ZNuDiHT1dBBOj3BlR8aenPIcx1590pefDL/RO1H7ogC",
        name: "Jane Smith",
        cellphone: "89123456789",
        cpf: "12312312312",
      },
      {
        role: "AGENTE",
        email: "alice.jones@example.com",
        password: "$2b$10$r07EqD6J.5ZNuDiHT1dBBOj3BlR8aenPIcx1590pefDL/RO1H7ogC",
        name: "Alice Jones",
        cellphone: "79123456789",
        cpf: "12312312312",
        creci: "12312312312",
      },
      {
        role: "IMOBILIARIA",
        email: "imobas.imobas@example.com",
        password: "$2b$10$r07EqD6J.5ZNuDiHT1dBBOj3BlR8aenPIcx1590pefDL/RO1H7ogC",
        cellphone: "69123456789",
        name: "Imobas",
        cnpj: "12312312312",
      },
];

async function seedData() {
  console.log("Seeding...");

  for (const user of users) {
    const result = await prisma.user.create({
      data: user,
    });
    console.log(`Created user with id: ${result.id}`);
  }

  console.log("Finished seeding.");
}

seedData()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
