import type { Request, Response } from 'express';
import demandService from '../services/DemandService.ts';

class DemandController {
  async create(req: Request, res: Response) {
    try {
      const { title, description, category } = req.body;
      const authorId = req.user!.id;

      const demand = await demandService.create({ title, description, category, authorId });

      res.status(201).json(demand);
    } catch (err) {
      console.log('Error: ' + err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const category = req.query.category as string | undefined;
      const demands = await demandService.findAll(category);
      res.status(200).json(demands);
    } catch (err) {
      console.log('Error: ' + err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const demand = await demandService.findById(id);

      if (!demand) {
        res.status(404).json({ message: 'Demand not found' });
        return;
      }

      res.status(200).json(demand);
    } catch (err) {
      console.log('Error: ' + err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const userId = req.user!.id;
      const { title, description, category, status } = req.body;

      const demand = await demandService.update(
        id,
        { title, description, category, status },
        userId,
      );

      res.status(200).json(demand);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Internal server error';
      const status = message.includes('Not authorized')
        ? 403
        : message.includes('not found')
          ? 404
          : 500;
      res.status(status).json({ message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const userId = req.user!.id;

      await demandService.delete(id, userId);

      res.status(204).send();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Internal server error';
      const status = message.includes('Not authorized')
        ? 403
        : message.includes('not found')
          ? 404
          : 500;
      res.status(status).json({ message });
    }
  }
}

export default new DemandController();
