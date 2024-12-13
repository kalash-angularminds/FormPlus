import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log("Mongo db connection error: ", error);
    process.exit(1);
  }
  
};


