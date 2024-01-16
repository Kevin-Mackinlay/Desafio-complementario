import { CartModel}  from "../models/cart.js";

export default class Cart {
  constructor() {
    console.log("Working courses with database in mongodb");
  }

  async getAll() {
    let cart = await CartModel.find().lean();
    return cart;
  }

  async getById(id) {
    let cart = await CartModel.findById(id).lean();
    return cart;
  }

  async saveCart(cart) {
    let newCart = new CartModel(cart);
    let result = await newCart.save();
    return result;
  }

  async updateCart(id, cart) {
    const result = await CartModel.updateOne({ _id: id }, cart);
    return result;
  }

  async deleteCart(id) {
    //const result = await CourseModel.deleteOne({ _id: id });
    const result = await CartModel.findByIdAndDelete(id);
    return result;
  }
}

// Path: src/dao/dbmanager/product.js (continuation)  
