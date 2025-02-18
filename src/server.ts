import express from "express";

const server = express();

server.use(express.json());

const port = 8080;

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
