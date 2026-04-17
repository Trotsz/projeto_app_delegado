import type { Request, Response } from 'express';
import express from 'express';
const app = express();
const port = 3000;

app.get('/', (_: Request, res: Response): void => {
  res.send('Lorem Ipsum');
});

app.listen(port, () => {
  console.log('Rodando na porta ' + port);
});
