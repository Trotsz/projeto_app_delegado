const allowedOrigins = {
  production: [
    'https://projetoappdelegado.vercel.app',
    'https://projetoappdelegado.vercel.app/',
    'http://localhost:8081',
    'http://127.0.0.1:8081',
  ],
  development: ['http://localhost:8081', 'http://127.0.0.1:8081'],
};

const origins =
  process.env.NODE_ENV === 'production' ? allowedOrigins.production : allowedOrigins.development;

export const corsOptions = {
  origin: origins,
  credentials: true,
};
