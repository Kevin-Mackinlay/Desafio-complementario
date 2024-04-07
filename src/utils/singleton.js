import {logger} from "../utils/logger.js";
import { connect } from "mongoose";

class MongoSingleton{
    static #instance
    constructor(){
        connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})

    }
    static getInstance(){
        if(this.#instance){
            logger.info("Returning existing connection")
            return this.#instance
        }

        this.#instance = new MongoSingleton()
        logger.info("Creating new connection")
        return this.#instance
    }
}

export default MongoSingleton