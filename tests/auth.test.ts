import request from 'supertest';
import app from '../backend/src/app.ts';

describe('Auth - Registro e Login', () => {
  const user = {
    name: 'Teste',
    email: `teste${Date.now()}@email.com`,
    password: '123456',
  };

  it('Deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({ name: user.name, email: user.email, hashedPassword: user.password });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User created');
  });

  it('Deve fazer login e retornar um token JWT', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({ email: 'admin@email.com', password: '123456' });

    expect(res.status).toBe(201);
    expect(typeof res.text).toBe('string');
    expect(res.text.length).toBeGreaterThan(0);
  });

  it('Deve rejeitar login com credenciais inválidas', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({ email: 'invalido@email.com', password: 'errada' });

    expect(res.status).toBe(500);
  });
});
