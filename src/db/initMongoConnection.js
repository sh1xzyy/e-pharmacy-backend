import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

export const initMongoConnection = async () => {
  try {
    const user = getEnvVar("DB_USER");
    const password = getEnvVar("DB_PASSWORD");
    const url = getEnvVar("DB_URL");
    const db = getEnvVar("DB_NAME");

    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
