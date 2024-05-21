import cartModel from "../../dao/models/cart.model.js";
import productModel from "../../dao/models/product.model.js";
import { logger } from "../../utils/logger.js";

export default class CartService {
  async createCart() {
    try {
      return await cartModel.create({});
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  }

  async getCarts() {
    try {
      console.log("Fetching all carts");
      return await cartModel.find();
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  }

  async getCartById(cid) {
    try {
      return await cartModel.findById(cid).lean();
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  }

  async addAndUpdate(cid, pid) {
    try {
      const cart = await cartModel.findById(cid);
      const product = cart.products.find((prod) => prod.product._id == pid);

      if (!product) {
        console.log(`Adding new product ${pid} to cart ${cid}`);
        return await cartModel.updateOne(
          { _id: cid },
          { $push: { products: { product: pid, quantity: 1 } } }
        );
      } else {
        console.log(`Updating quantity of product ${pid} in cart ${cid}`);
        return await cartModel.updateOne(
          { _id: cid, "products.product": pid },
          { $inc: { "products.$.quantity": 1 } },
          { new: true, upset: true }
        );
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
