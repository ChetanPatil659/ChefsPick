// import mongoose from "mongoose";

// mongoose.set("strictQuery", false);

// const dbConnect = async () => {
//   const PORT = "mongodb+srv://patilchetan659:chetan659@cluster0.o2qe1zg.mongodb.net/?retryWrites=true&w=majority"
//   try {
//     await mongoose.connect(PORT);
//     console.log("Database Connected at", PORT);
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

// export default dbConnect;


import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = "mongodb+srv://patilchetan659:chetan659@cluster0.o2qe1zg.mongodb.net/chefsPick?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default async function dbConnect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
