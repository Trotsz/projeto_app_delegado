import demandRepository from '../repositories/DemandRepository.ts';
import userRepository from '../repositories/UserRepository.ts';

class DemandService {
  async create(data: {
    title: string;
    description?: string;
    category?: string;
    imageUrl?: string;
    authorId: string;
  }) {
    const user = await userRepository.findById(data.authorId);
    if (!user) throw new Error('Usuário não encontrado. Faça login novamente.');
    return demandRepository.create(data);
  }

  async findAll(
    category?: string,
    authorId?: string,
    user?: { id: string; role: 'ADMIN' | 'USER' },
  ) {
    if (authorId) {
      return demandRepository.findAll(category, authorId);
    }

    const isAdmin = user?.role === 'ADMIN';
    if (isAdmin) {
      return demandRepository.findAll(category);
    }

    return demandRepository.findAll(category, undefined, true);
  }

  async findById(id: number, user?: { id: string; role: 'ADMIN' | 'USER' }) {
    const demand = await demandRepository.findById(id);
    if (!demand) return null;

    if (demand.approved) return demand;
    if (user?.role === 'ADMIN') return demand;
    if (user?.id === demand.authorId) return demand;

    return null;
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

  async approve(id: number) {
    const demand = await demandRepository.findById(id);
    if (!demand) throw new Error('Demand not found');
    await demandRepository.updateApproved(id, true);
    return demandRepository.update(id, { status: 'ONGOING' });
  }

  async complete(id: number) {
    const demand = await demandRepository.findById(id);
    if (!demand) throw new Error('Demand not found');
    if (demand.status !== 'ONGOING') throw new Error('Demanda não está em andamento');
    return demandRepository.update(id, { status: 'SOLVED' });
  }

  async disapprove(id: number) {
    const demand = await demandRepository.findById(id);
    if (!demand) throw new Error('Demand not found');
    return demandRepository.delete(id);
  }

  async delete(id: number, userId: string, userRole?: 'ADMIN' | 'USER') {
    const demand = await demandRepository.findById(id);
    if (!demand) throw new Error('Demand not found');
    if (demand.authorId !== userId && userRole !== 'ADMIN') {
      throw new Error('Not authorized to delete this demand');
    }
    return demandRepository.delete(id);
  }
}

export default new DemandService();
