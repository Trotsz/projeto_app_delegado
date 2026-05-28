import { prisma } from '../src/lib/prisma';
import { Role } from '../src/generated/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  await prisma.user.upsert({
    where: { email: 'admin@email.com' },
    update: {},
    create: {
      email: 'admin@email.com',
      name: 'Admin',
      hashedPassword,
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@email.com' },
    update: {},
    create: {
      email: 'user@email.com',
      name: 'Usuário Teste',
      hashedPassword,
      role: Role.USER,
    },
  });

  console.log('Seed concluído com sucesso');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    await prisma.$disconnect();
    console.log('Error: ' + err);
    process.exit(1);
  });
