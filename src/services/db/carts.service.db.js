import cartModel  from "../../dao/models/cart.model.js";
import  productModel  from "../../dao/models/product.model.js";

export default class CartsService {
  // constructor(repo) {
  //   this.cartRepo = repo;
  // }

  async createCart() {
    try {
      return await cartModel.create({});
    } catch (error) {
      throw error;
    }
  }

  async getCarts() {
    try {
      return await cartModel.find();
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
    return await cartModel.findOne({ _id: id }).lean()
    } catch (error) {
      throw error;
    }
  }

  async addAndUpdate(cid, pid) {
    try{
      const cart = await cartModel.findById({ _id: cid });
      const products = cart.products.find(prod => prod.product == pid)
      if(!products){
        return await cartModel.updateOne({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } });
      
    }else {
      return await cartModel.updateOne({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": 1 } });
    }
    }
    catch(error){
      throw error;
    }
  }

  async deleteOne( cid,pid){
    try{
      let prod = await productModel.findById(pid);
      return await cartModel.updateOne({ _id: cid }, { $pull: { products: { product: prod } } });
    }
    catch(error){
      throw error;
    }
  }
 
  async deleteAll(id) {
    try{
      return await cartModel.updateOne({ _id: id }, {products: []});
    }
    catch(error){
      throw error;
    }
  }

  async delete(id){
    try{
      return await cartModel.deleteOne({ _id: id });
    }
    catch(error){
      throw error;
    }
  }
}
