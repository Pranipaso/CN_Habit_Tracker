// importing mongoose
import mongoose from "mongoose";

// getting database url from env variables

// connect to database
const connect = async () => {
  const { MONGODB } = process.env;
  // const url = ``;
  try {
    await mongoose.connect(MONGODB);
    console.log("mongo db connected successfully");
  } catch (error) {
    console.log("database connection is failed", error);
  }
};

export { connect };
