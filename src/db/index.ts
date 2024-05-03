import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
let isConnected = false;

export const connectDB = async () => {
  try {
    if (isConnected) {
      console.log('Using existing connection');
      return Promise.resolve();
    }

    console.log('Using new connection');
    const db = await mongoose.connect(`${process.env.DATABASE_URL}`, {
      dbName: process.env.DATABASE_NAME,
    });

    isConnected = db.connections[0].readyState === 1;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
