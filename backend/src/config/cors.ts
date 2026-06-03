const allowedOrigins = {
  production: ['https://projetoappdelegado.vercel.app/'],
  development: ['http://localhost:8081'],
};

const origins =
  process.env.NODE_ENV == 'production' ? allowedOrigins.production : allowedOrigins.development;

export const corsOptions = {
  origin: origins,
  credentials: true,
};
