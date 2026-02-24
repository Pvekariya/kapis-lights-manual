import { url } from "inspector";
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI in .env.local");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = new MongoClient(uri!);
  await client.connect();

  const db = client.db("kapis");

  cachedClient = client;
  cachedDb = db;

  return db;
}