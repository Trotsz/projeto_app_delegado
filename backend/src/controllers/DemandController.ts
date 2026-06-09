import type { Request, Response } from 'express';
import demandService from '../services/DemandService.ts';

class DemandController {
  async create(req: Request, res: Response) {
    try {
      const { title, description, category } = req.body;

      if (!title || !title.trim()) {
        res.status(400).json({ message: 'O título é obrigatório' });
        return;
      }

      const authorId = req.user!.id;
      const multerFile = (req as { file?: Express.Multer.File }).file;
      const imageUrl = multerFile ? `/uploads/${multerFile.filename}` : undefined;
      const demand = await demandService.create({
        title,
        description,
        category,
        imageUrl,
        authorId,
      });

      res.status(201).json(demand);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const category = req.query.category as string | undefined;
      const authorId = req.query.authorId as string | undefined;
      const user = req.user ? { id: req.user.id, role: req.user.role } : undefined;
      const demands = await demandService.findAll(category, authorId, user);
      res.status(200).json(demands);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = req.user ? { id: req.user.id, role: req.user.role } : undefined;
      const demand = await demandService.findById(id, user);

      if (!demand) {
        res.status(404).json({ message: 'Demand not found' });
        return;
      }

      res.status(200).json(demand);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ message });
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
      const userRole = req.user!.role;

      await demandService.delete(id, userId, userRole);

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

  async approve(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const demand = await demandService.approve(id);

      res.status(200).json(demand);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Internal server error';
      const status = message.includes('not found') ? 404 : 500;
      res.status(status).json({ message });
    }
  }

  async disapprove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      await demandService.disapprove(id);

      res.status(204).send();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Internal server error';
      const status = message.includes('not found') ? 404 : 500;
      res.status(status).json({ message });
    }
  }
}

export default new DemandController();
