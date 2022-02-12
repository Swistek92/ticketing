import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
<<<<<<< HEAD
  console.log('statring up......');
=======

  console.log('statring up.....');

>>>>>>> 528be84b0b0e9de2d9762819b1c5fb009a36c2de
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
