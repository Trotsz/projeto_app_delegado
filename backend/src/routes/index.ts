import type { Request, Response } from 'express';
import express from 'express';
import userController from '../controllers/UserController.ts';

const app = express();
const port = 3000;

app.get('/', (_: Request, res: Response) => {
  res.send('Root');
});

app.get('/users', (_, res) => {
  userController.findAll(_, res);
});

app.listen(port, () => {
  console.log('Rodando na porta ' + port);
});
