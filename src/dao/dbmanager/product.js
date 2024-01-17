import { productModel } from "../models/product.js";

export default class Product {
  constructor() {
    console.log("Working products with database in mongodb");
  }

  async getAll() {
    let products = await productModel.find().lean();
    return products;
  }

  async getById(id) {
    let product = await productModel.findById(id).lean();
    return product;
  }

  async saveProduct(product) {
    let newProduct = new productModel(product);
    let result = await newProduct.save();
    return result;
  }

  async updateProduct(id, product) {
    const result = await productModel.updateOne({ _id: id }, product);
    return result;
  }

  async deleteProduct(id) {
    //const result = await CourseModel.deleteOne({ _id: id });
    const result = await productModel.findByIdAndDelete(id);
    return result;
  }
}