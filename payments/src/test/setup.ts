// import { request } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

declare global {
  function signin(id?: string): string[];
}

jest.mock('../nats-wrapper.ts');
// jest.mock('../stripe');

process.env.STRIPE_KEY =
  'sk_test_51KRWUwDla2rvh9rBPFnn9Y0t5o87qPIUuD2iIrioPDKUtYyo1BmIW4ipGjcphOkH8VUckZClzjxTNASqZY17inJG00xBitB9HH';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'dasdasd';
  // mongo = new MongoMemoryServer();
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);

  // await mongoose.connect(mongoUri, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  //build a jwt payload { id, emial , }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  //create jwt!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //build session obj. {jwt: my_jwt}
  const session = { jwt: token };

  // take that session into json

  const sessionJSON = JSON.stringify(session);

  //take json and encode it as base 64

  const base64 = Buffer.from(sessionJSON).toString('base64');

  //return string thats a cooki withone encode data

  return [`session=${base64}`];
};
