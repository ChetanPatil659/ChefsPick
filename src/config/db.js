import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/recipe_app");
    console.log("Database Connected at", "mongodb://localhost:27017/recipe_app");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default dbConnect;