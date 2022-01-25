import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful singnup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
});

it('returns 400 with a invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'testtest.com', password: 'password' })
    .expect(400);
});

it('returns 400 with a invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '-_-' })
    .expect(400);
});

it('returns 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com' })
    .expect(400);
  return request(app)
    .post('/api/users/signup')
    .send({ password: 'password' })
    .expect(400);
});

it('dissallows dupicate email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  // console.log(response.get('Set-Cookie'));
  expect(response.get('Set-Cookie')).toBeDefined();
});
