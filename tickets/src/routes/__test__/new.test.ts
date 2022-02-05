import { response } from 'express';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('has a route handler listening to /api/tickets for post req.', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if user is signed in .', async () => {
  const response = await request(app).post('/api/tickets').send({}).expect(401);

  // expect(response.status).toEqual(401)
});

it('returns a status other then 401 if user is signed in ', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({})
    .set('Cookie', global.signin());
  // console.log(response.status);
  expect(response.status).not.toEqual(401);
});
it('returns an err if an ivalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it('reurns an error if an ivalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '123123213213',
      price: -10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '123123213',
    })
    .expect(400);
});
it('create a ticket with valid inputs', async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  // ad in a check to make usre a ticker was saved
  await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
    title: 'dasdasdsa',
    price: 20,
  });
  expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(20);
});

it('published an event', async () => {
  await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
    title: 'dasdasdsa',
    price: 20,
  });
  expect(201);

  // console.log(natsWrapper);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
