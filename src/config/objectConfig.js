import dotenv from 'dotenv';
import MongoSingleton from  '../utils/singleton.js';

dotenv.config({path: MODE ==='dev' ? './.env.dev' : './.env.prod'}); // Load the .env file according to the environment

console.log(process.env.PERSISTENCE);
module.exports = {
    persistence: process.env.PERSISTENCE ,
    PORT: process.env.PORT || 8080,
    DB_URL: process.env.DB_URL || "mongodb://localhost:27017/",
    EMAIL_USER: process.env.EMAIL_USER,
    APP_PASSWORD: process.env.APP_PASSWORD,
    connectDB: async() => await MongoSingleton.getInstance()

}


