import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const payload = Array.from({ length: 100 }).map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  phone: "9999",
}));

async function main() {
  
  // for seeding multiple records  
  await prisma.contact.createMany({
    data: payload,
  });

  // for updating mutiple records 
  await prisma.contact.updateMany({
    where: {
      phone: {
        contains: "9999",
      },
    },
    data: {
      phone: "786",
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
