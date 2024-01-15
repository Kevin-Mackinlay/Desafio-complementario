import mongoose from "mongoose"

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },  
    description: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },  
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
