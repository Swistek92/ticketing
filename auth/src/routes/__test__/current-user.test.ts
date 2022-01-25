import request from 'supertest';
import { app } from '../../app';

it('response with details about current user', async () => {
  const cookie = await global.signin();
  // console.log(cookie);
  const response = await request(app)
    .get('/api/users/crurentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  console.log(response.body);
  expect(response.body.email).toEqual('test@test.com');
});

it('responds with null if not authorizated', async () => {
  const response = await request(app)
    .get('/api/users/crurentuser')
    .send()
    .expect(200);

  // console.log(response.body);
  expect(response.body).toEqual({});
});
