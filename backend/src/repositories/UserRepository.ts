import { prisma } from '../lib/prisma.ts';

class UserRepository {
  async findAll() {
    return prisma.user.findMany();
  }
}

export default new UserRepository();
