// =========================================================
// database.js — connect to MongoDB once, then share the connection
// =========================================================

const { MongoClient } = require("mongodb");

// Local MongoDB by default. For Atlas, set the MONGODB_URI environment variable.
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const DATABASE_NAME = "simpleschedule";

const client = new MongoClient(MONGODB_URI);

// Connect and return the database, so server.js can use it
async function connectToDatabase() {
  await client.connect();
  console.log("Connected to MongoDB database: " + DATABASE_NAME);
  return client.db(DATABASE_NAME);
}

// "module.exports" lets other files use this function with require("./database")
module.exports = { connectToDatabase };
