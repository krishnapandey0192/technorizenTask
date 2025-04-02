import mongoose from "mongoose";
import { environmentConfig } from "./environmentConfig.js";

export const dbConfig = async () => {
  try {
    const connect = await mongoose.connect(environmentConfig.dbHost);
    console.log(
      "connected to the database successfully",
      connect.connection.host
    );
  } catch (err) {
    console.log("error while connecting to the database", err);
    process.exit(1);
  }
};
