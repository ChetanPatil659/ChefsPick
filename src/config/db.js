import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const dbConnect = async () => {
  const PORT = "mongodb+srv://patilchetan659:FyJLnMF7HbsVnkoE@cluster0.o2qe1zg.mongodb.net/?retryWrites=true&w=majority"
  try {
    await mongoose.connect(PORT, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database Connected at", PORT);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default dbConnect;