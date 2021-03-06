import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import globalExceptionHandler from './middlewares/globalExceptionHandler';
import routes from './routes';

import 'shared/infra/typeorm';
import 'shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(globalExceptionHandler);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
