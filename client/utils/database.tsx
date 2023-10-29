import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return true;

  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connected");
      return true;
    } else throw new Error("MongoDB connection error. No MongoDB URI found.");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
