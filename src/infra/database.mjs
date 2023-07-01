import { MongoClient } from 'mongodb';
import envs from '../config/envs.mjs';

const dbClient = new MongoClient(envs.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default dbClient;
