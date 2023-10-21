import mongoose from "mongoose";
import config from "./config";
import { PRODUCTION, TRUE } from "../constants/general";

/**
 * Connect To Database
 */
const connectDB = async () => {
  let DB: string = "";
  if (config.db.url?.includes("localhost")) {
    const PASSWORD = config.db.password || "";
    DB = config.db.url && config.db.url.replace("<PASSWORD>", PASSWORD);
  } else {
    DB = config.db.url || "";
  }

  const options = {
    useNewUrlParser: TRUE,
    autoIndex: TRUE,
    // useNewUrlParser: true,
    serverSelectionTimeoutMS: 5000,
  };
  try {
    const connection = await mongoose.connect(DB, options);
    console.log(`MongoDB connected to ${connection.connection.host} DB ✅`);
    console.log(config.db?.url);
  } catch (e: any) {
    console.log(`Error connecting to mongoose due to ${e.message} ❌`);
  }
};

module.exports = connectDB;

export default connectDB;