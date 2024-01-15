import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true, max: 100 },
    stock: { type: Number, required: true },
});

export const productModel = mongoose.model(productCollection, productSchema);