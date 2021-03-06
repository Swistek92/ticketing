import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  console.log('listen..');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL must be defined');
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('connection to mongodb');
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log('serv listen on 3000000');
  });
};

start();
