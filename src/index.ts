import express, { Request, Response } from 'express';
import { config as dotenvConfig } from 'dotenv';
import router from './router';
import * as middlewares from './middlewares';

dotenvConfig();

const app = express();
const port = process.env.API_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ info: 'TypeScript, Express, Postgres, and Prisma API' });
});

app.use('/users', router);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
