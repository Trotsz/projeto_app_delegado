import { prisma } from '../src/lib/prisma';
import { Role } from '../src/generated/prisma';

async function main() {
  await prisma.user.upsert({
    where: { email: 'test@gmail.com' },
    update: {},
    create: {
      email: 'test@gmail.com',
      name: 'John Doe',
      hashedPassword: 'a123',
      role: Role.USER,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    await prisma.$disconnect;
    console.log('Error: ' + err);
    process.exit(1);
  });
