import express from 'express';
import cors from 'cors';
import routes from './routes/index.ts';

const app = express();
app.use(cors({ origin: ['http://localhost:8081', 'https://projetoappdelegado.vercel.app'] }));
app.use(express.json());
app.use(routes);

export default app;
