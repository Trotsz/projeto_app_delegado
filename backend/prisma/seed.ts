import 'dotenv/config';
import { prisma } from '../src/lib/prisma';
import { Role } from '../src/generated/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || 'Administrador';

  if (!adminEmail || !adminPassword) {
    console.error(
      'Defina ADMIN_EMAIL e ADMIN_PASSWORD no arquivo .env para criar o usuario admin.',
    );
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: adminName,
      hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log(`Admin "${adminEmail}" criado com sucesso`);
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
