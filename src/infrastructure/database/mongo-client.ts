import { MongoClient as Mongo, Db, Collection, Document } from 'mongodb';

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const client = new Mongo('mongodb://localhost:27017');
    const db = client.db('clean-ts');

    this.client = client;
    this.db = db;

    console.log('connected to mongodb!');
  },

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();

      this.client = undefined as unknown as Mongo;
      this.db = undefined as unknown as Db;

      console.log('mongodb connection closed.');
    }
  },

  getCollection<T extends Document>(name: string): Collection<T> {
    return this.client.db().collection<T>(name);
  },
};
