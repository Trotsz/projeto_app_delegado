import demandRepository from '../repositories/DemandRepository.ts';

class DemandService {
  async create(data: { title: string; description?: string; category?: string; authorId: string }) {
    return demandRepository.create(data);
  }

  async findAll(category?: string, authorId?: string) {
    return demandRepository.findAll(category, authorId);
  }

  async findById(id: number) {
    return demandRepository.findById(id);
  }

  async update(
    id: number,
    data: {
      title?: string;
      description?: string;
      category?: string;
      status?: 'SOLVED' | 'ONGOING';
    },
    userId: string,
  ) {
    const demand = await demandRepository.findById(id);
    if (!demand) throw new Error('Demand not found');
    if (demand.authorId !== userId) throw new Error('Not authorized to update this demand');
    return demandRepository.update(id, data);
  }

  async delete(id: number, userId: string) {
    const demand = await demandRepository.findById(id);
    if (!demand) throw new Error('Demand not found');
    if (demand.authorId !== userId) throw new Error('Not authorized to delete this demand');
    return demandRepository.delete(id);
  }
}

export default new DemandService();
