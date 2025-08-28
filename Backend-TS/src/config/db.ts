import { log } from "console";
import mongoose, { type ConnectOptions } from "mongoose";

const connectDB = async () => {
  try {
    log("Connecting to MongoDB...");
    await mongoose.connect(
      process.env.MONGO_URI || "",
      {
        autoIndex: true
      } as ConnectOptions
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;