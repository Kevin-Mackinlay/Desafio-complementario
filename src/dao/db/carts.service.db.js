import cartModel from "../../dao/models/cart.model.js";
import productModel from "../../dao/models/product.model.js";
import { logger } from "../../utils/logger.js";

export default class CartService {
  async create() {
    try {
      return await cartModel.create();
    } catch (error) {
      logger.error(error);
    }
  }

  async getCarts() {
    try {
      console.log(1);
      return await cartModel.find();
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  }

  async getCartById(id) {
    try {
      return await cartModel.findById({ _id: id }).lean();
    } catch (error) {
      logger.error(error);
    }
  }

  async addAndUpdate(cid, pid) {
    try {
      const cart = await cartModel.findById({ _id: cid });
      const products = cart.products.find((prod) => prod.product._id == pid);

      if (!products) {
        return await cartModel.updateOne({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } });
      } else {
        return await cartModel.updateOne({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": 1 } }, { new: true, upset: true });
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteOne(cid, pid) {
    try {
      let prod = await productModel.findById(pid);

      return await cartModel.updateOne({ _id: cid }, { $pull: { products: { product: prod } } });
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteAll(id) {
    try {
      return await cartModel.updateOne({ _id: id }, { products: [] });
    } catch (error) {
      logger.error(error);
    }
  }

  async delete(id) {
    try {
      return await cartModel.deleteOne({ _id: id });
    } catch (error) {
      logger.error(error);
    }
  }
}
