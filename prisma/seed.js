const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const users = [
  {
    email: "john.doe@example.com",
    name: "John Doe",
    password: "password123",
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    password: "password123",
  },
  {
    email: "alice.jones@example.com",
    name: "Alice Jones",
    password: "password123",
  },
  {
    email: "bob.brown@example.com",
    name: "Bob Brown",
    password: "password123",
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
