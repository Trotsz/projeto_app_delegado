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

  async findAll(category?: string, authorId?: string) {
    const where: Record<string, unknown> = {};

    if (category && category !== 'all') {
      if (category === 'outros') {
        where.OR = [{ category: 'outros' }, { category: null }];
      } else {
        where.category = category;
      }
    }

    if (authorId) {
      where.authorId = authorId;
    }

    return prisma.demand.findMany({
      where: Object.keys(where).length ? where : undefined,
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
