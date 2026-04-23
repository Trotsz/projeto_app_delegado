import type { Request, Response } from 'express';
import userService from '../services/UserService.ts';

class UserController {
  findAll = async (_: Request, res: Response) => {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch (err) {
      console.log('Error: ' + err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

export default new UserController();
