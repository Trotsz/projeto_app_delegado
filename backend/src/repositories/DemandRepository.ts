import { prisma } from '../lib/prisma.ts';

class DemandRepository {
  async create(data: { title: string; description?: string; category?: string; authorId: string }) {
    return prisma.demand.create({
      data: {
        title: data.title,
        description: data.description ?? null,
        category: data.category ?? null,
        author: { connect: { id: data.authorId } },
      },
    });
  }

  async findAll(category?: string) {
    return prisma.demand.findMany({
      where:
        category && category !== 'all'
          ? category === 'outros'
            ? { OR: [{ category: 'outros' }, { category: null }] }
            : { category }
          : undefined,
      include: { author: { select: { id: true, name: true, email: true } } },
    });
  }

  async findById(id: number) {
    return prisma.demand.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
  }

  async update(
    id: number,
    data: {
      title?: string;
      description?: string;
      category?: string;
      status?: 'SOLVED' | 'ONGOING';
    },
  ) {
    return prisma.demand.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.demand.delete({ where: { id } });
  }
}

export default new DemandRepository();
