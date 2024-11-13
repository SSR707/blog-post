import mongoose from "mongoose";
import { logger } from "../utils/index.js";

export const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Mongoose connnect");
  } catch (err) {
    throw new Error(err.message);
  }
};
