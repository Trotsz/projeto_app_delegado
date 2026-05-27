import express from 'express';
import routes from './routes/index.ts';

const app = express();
app.use(express.json());
app.use(routes);

const port = 3000;
app.listen(port, () => {
  console.log('Ouvindo na porta ' + port);
});
