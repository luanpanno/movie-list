/* eslint-disable no-console */
import cors from 'cors';
import express from 'express';

import { mongoConnect } from './config/db';
import { env } from './config/env';
import router from './routes';

const app = express();

mongoConnect(env.MONGO_URL).then(
  () => {
    console.log(`Database connected succesfully at ${env.MONGO_URL}\n`);
  },
  (err: any) => {
    console.log(`Error on database connect...: ${err}`);
    process.exit();
  }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`\nServer on at: https://localhost:${env.PORT}`);

  console.log('To shutdown: CTRL + C\n');
});
