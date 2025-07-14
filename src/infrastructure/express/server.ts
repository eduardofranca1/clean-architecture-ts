import 'module-alias/register';
import express from 'express';
import env from '@/main/config/env';
import { MongoClient } from '../database/mongo-client';
import { setupRoutes } from './setup/setup-routes';

const app = async () => {
  await MongoClient.connect(env.mongoUrl);

  const server = express();

  server.use(express.json());

  setupRoutes(server);

  server.listen(env.port, () => {
    console.log(`server running on ${env.port}`);
  });
};

app();
