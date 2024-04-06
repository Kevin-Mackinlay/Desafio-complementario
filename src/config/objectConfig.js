import dotenv from "dotenv";
import MongoSingleton from "../utils/singleton.js";


const MODE = process.env.NODE_ENV || "dev";
dotenv.config({ path: MODE === "dev" ? "./.env.dev" : "./.env.prod" }); // Load the .env file according to the environment

console.log("PERSISTENCE" ,process.env.PERSISTENCE);

const config = {
  persistence: process.env.PERSISTENCE || "mongodb",
  PORT: parseInt(process.env.PORT, 10) || 8080,
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/",
  EMAIL_USER: process.env.EMAIL_USER || "",
  APP_PASSWORD: process.env.APP_PASSWORD || "",

  connectDB: async () => {
    try {
      return await MongoSingleton.getInstance();
    } catch (error) {
       console.error("Error connecting to the database:", error.message);
      // Optionally rethrow the error to handle it elsewhere
      throw error;
    }
  },
}


export default config;
