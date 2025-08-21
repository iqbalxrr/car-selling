// lib/dbConnect.js
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DB_URL;
if (!uri) {
  throw new Error("Please define the DB_URL environment variable inside .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Development e hot reload issue avoid
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  clientPromise = client.connect();
}

async function dbConnect() {
  try {
    const client = await clientPromise;
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export default dbConnect;
