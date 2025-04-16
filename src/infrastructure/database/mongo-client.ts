import { MongoClient as Mongo, Collection, Document } from 'mongodb';

export const MongoClient = {
  client: undefined as unknown as Mongo,
  uri: undefined as unknown as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await Mongo.connect(uri);
    console.log('connected to mongodb!');
  },

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = undefined as unknown as Mongo;
      console.log('mongodb connection closed.');
    }
  },

  getCollection<T extends Document>(name: string): Collection<T> {
    return this.client.db().collection<T>(name);
  },
};
