import request from 'supertest';
import app from '../backend/src/app.ts';

let token = '';

beforeAll(async () => {
  const res = await request(app)
    .post('/user/login')
    .send({ email: 'admin@email.com', password: '123456' });
  token = res.text;
});

describe('Demand - Rotas Protegidas', () => {
  it('Deve rejeitar criar demanda sem token', async () => {
    const res = await request(app)
      .post('/demand/create')
      .send({ title: 'Teste', description: 'Descrição' });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('No token provided');
  });

  it('Deve rejeitar criar demanda com token inválido', async () => {
    const res = await request(app)
      .post('/demand/create')
      .set('Authorization', 'Bearer token_invalido')
      .send({ title: 'Teste', description: 'Descrição' });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid or expired token');
  });

  it('Deve criar uma demanda com token válido', async () => {
    const res = await request(app)
      .post('/demand/create')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Demanda Teste', description: 'Descrição da demanda' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Demanda Teste');
  });
});
