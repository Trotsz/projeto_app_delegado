import type { Request, Response } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
import userController from '../controllers/UserController.ts';

const app = express();
const port = 3000;

const jsonParser = bodyParser.json();

app.get('/', (_: Request, res: Response) => {
  res.send('Root');
});

app.post('/user/register', jsonParser, (req: Request, res: Response) => {
  userController.create(req, res);
});

app.post('/user/login', jsonParser, (req: Request, res: Response) => {
  userController.login(req, res);
});

app.get('/users', (_: any, res: Response) => {
  userController.findAll(_, res);
});

app.get('/user/:email', (req, res) => {
  userController.findByEmail(req, res);
});

app.listen(port, () => {
  console.log('Rodando na porta ' + port);
});
