import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { corsOptions } from './config/cors.ts';
import { UPLOADS_BASE_URL } from './config/upload.ts';
import routes from './routes/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.use(express.json());
app.use(UPLOADS_BASE_URL, express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

export default app;
