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
}

export default new UserRepository();
