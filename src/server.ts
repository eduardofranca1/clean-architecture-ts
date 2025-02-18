import express from "express";
import { MongoClient } from "./infra/database/mongo-client";

const app = async () => {
  await MongoClient.connect();

  const server = express();

  server.use(express.json());

  const port = 8080;

  server.listen(port, () => {
    console.log(`server running on ${port}`);
  });
};

app();
