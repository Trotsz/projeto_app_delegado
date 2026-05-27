import type { Request, Response } from 'express';
import userService from '../services/UserService.ts';

class UserController {
  create = async (req: Request, res: Response) => {
    try {
      userService.create(req.body);
      res.status(201).send('User created');
    } catch (err) {
      console.log('Error: ' + err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { token } = await userService.login(req.body);
      res.status(201).send(token);
    } catch (err) {
      console.log('Error: ' + err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  findAll = async (_: Request, res: Response) => {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch (err) {
      console.log('Error: ' + err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  findByEmail = async (req: Request, res: Response) => {
    try {
      const user = await userService.findByEmail(req.params.email);
      res.json(user);
    } catch (err) {
      console.log('Error: ' + err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

export default new UserController();
