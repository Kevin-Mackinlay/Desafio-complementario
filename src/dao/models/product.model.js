import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 100 },
  price: { type: Number, default: 0 },
  thumbnail: { type: String, required: true, max: 100 },
  stock: { type: Number, default: 1 },
  code: { type: String, required: true, max: 10  },
  category: { type: String, required: true, max: 20 },
});

const ProductModel = mongoose.model(productCollection, productSchema);
export default ProductModel;