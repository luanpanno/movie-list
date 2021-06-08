import cors from 'cors';
import express from 'express';
import { env } from './config/env';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`\nServer on at: https://localhost:${env.PORT}`);

  console.log('To shutdown: CTRL + C\n');
});
