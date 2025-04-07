import express from 'express';
import { MongoClient } from '../database/mongo-client';
import { setupRoutes } from './setup/setup-routes';

const app = async () => {
  await MongoClient.connect();

  const server = express();

  server.use(express.json());

  setupRoutes(server);

  const port = 8080;

  server.listen(port, () => {
    console.log(`server running on ${port}`);
  });
};

app();
