import type { Request, Response } from 'express';
import userService from '../services/UserService.ts';

class UserController {
  async create(req: Request, res: Response) {
    try {
      await userService.create(req.body);
      res.status(201).json({ message: 'User created' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.log('Error: ' + message);
      res.status(400).json({ message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { token } = await userService.login(req.body);
      res.status(201).send(token);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.log('Error: ' + message);
      if (
        message === 'There is no registered user with that email' ||
        message === 'Invalid credentials'
      ) {
        res.status(401).json({ message: 'Email ou senha inválidos' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async findAll(_: Request, res: Response) {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch (err) {
      console.log('Error: ' + err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async findByEmail(req: Request, res: Response) {
    try {
      const user = await userService.findByEmail(req.params.email);
      res.json(user);
    } catch (err) {
      console.log('Error: ' + err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { name } = req.body;

      if (!name || !name.trim()) {
        res.status(400).json({ message: 'Nome é obrigatório' });
        return;
      }

      const user = await userService.update(userId, { name: name.trim() });
      res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
    } catch (err) {
      console.log('Error: ' + err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new UserController();
