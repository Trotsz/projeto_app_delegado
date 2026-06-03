import { prisma } from '../lib/prisma.ts';

class UserRepository {
  async create(data: any) {
    return prisma.user.create({ data });
  }

  async findAll() {
    return prisma.user.findMany();
  }

  async findByEmail(email: any) {
    return prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: { name?: string; hashedPassword?: string }) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
}

export default new UserRepository();
