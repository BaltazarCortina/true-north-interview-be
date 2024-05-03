import express from 'express';
import dotenv from 'dotenv';

import routes from './routes';
import { connectDB } from './db';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/', routes);

if (process.env.IS_LOCAL) {
  app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    await connectDB();
    console.log(`Database connected`);
  });
} else {
  app.use(async (req, res, next) => {
    await connectDB();
    next();
  });
}

export default app;
