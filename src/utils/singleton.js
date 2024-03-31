import mongoose from "mongoose";
import {logger} from "../utils/logger.js";

class MongoSingleton{
    static #instance
    constructor(){
        RTCPeerConnectionIceEvent(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})

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