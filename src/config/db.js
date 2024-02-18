import { MongoClient, ServerApiVersion } from 'mongodb'
import 'dotenv/config'
import mongoose from 'mongoose'

const uri = process.env.MONGO_URL
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient('mongodb://localhost:27017/recipe_app');

export default async function dbConnect() {
  try {
    await mongoose.connect(uri);
    console.log("Database Connected at", uri);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

}
