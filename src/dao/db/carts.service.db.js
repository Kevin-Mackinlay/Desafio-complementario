import cartModel from "../../dao/models/cart.model.js";
import productModel from "../../dao/models/product.model.js";
import { logger } from "../../utils/logger.js";

export default class CartService {

  async createCart() {
    try {
      return await cartModel.create({});
    } catch (error) {
      logger.error(error);
      throw new Error("Error creating cart");
    }
  }

  async getCarts() {
    try {
      return await cartModel.find();
    } catch (error) {
      logger.error(error);
      throw new Error("Error fetching carts");
    }
  }

  async getCartById(cid) {
    try {
      return await cartModel.findById(cid).lean();
    } catch (error) {
      logger.error(error);
      throw new Error("Error fetching cart by ID");
    }
  }

async addProductToCart(cid, pid) {
    try {
      const cart = await cartModel.findOne({ _id: cid });	
      //buscamos el producto en el carrito basado en el id del producto 
      const productIndex= cart.products.findIndex(item => item.productID.toString() == productToAdd._id.toString()) ;

      if(productIndex !== -1){
        cart.products[productIndex].quantity += 1; // si el producto ya existe en el carrito, incrementamos la cantidad
      }
      else{
        cart.products.push({productID: pid}); // si no existe, lo agregamos al carrito
      }

      await cartModel.updateOne({ _id: cid }, cart);
      return cart;
    }
    catch (error) {
      logger.error(error);
      throw new Error("Error adding product to cart");
    }
  }

  async deleteOne(cid, pid) {
    try {
      return await cartModel.updateOne({ _id: cid }, { $pull: { products: { product: pid } } });
    } catch (error) {
      logger.error(error);
      throw new Error("Error deleting product from cart");
    }
  }

  async deleteAll(id) {
    try {
      return await cartModel.updateOne({ _id: id }, { products: [] });
    } catch (error) {
      logger.error(error);
      throw new Error("Error emptying cart");
    }
  }

  async delete(id) {
    try {
      return await cartModel.deleteOne({ _id: id });
    } catch (error) {
      logger.error(error);
      throw new Error("Error deleting cart");
    }
  }
}
