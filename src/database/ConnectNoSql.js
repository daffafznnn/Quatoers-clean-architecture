import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectNoSQL = async () => {
  try {
    await mongoose.connect(process.env.NOSQL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to NoSQL database");
  } catch (error) {
    console.error("Error connecting to NoSQL database", error);
    process.exit(1); // Exit process with failure
  }
};

export { connectNoSQL };