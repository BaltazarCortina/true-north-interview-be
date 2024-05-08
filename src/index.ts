import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

import routes from './routes';
import { connectDB } from './db';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

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

export const handler = serverless(app);

export default app;
