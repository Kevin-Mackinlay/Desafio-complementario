import CartModel from "../../dao/models/Cart.model.js";
export default class CartsManager {
  async createCart() {
    try {
      const product = [];
      const cart = await CartModel.create({ product });

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getCarts() {
    try {
      const carts = await CartModel.find().lean();

      return carts;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cid) {
    try {
      const cart = await CartModel.findById(cid).lean();

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const productExistsInCart = await CartModel.exists({ _id: cid, "products.product": pid });
      let cart;
      if (!productExistsInCart) {
        cart = await CartModel.findByIdAndUpdate(cid, { $push: { product: { product: pid, quantity: 1 } } }, { new: true }).lean();
      } else {
        cart = await CartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": 1 } }, { new: true }).lean();
      }

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async updateProductQuantity(pid, cid, quantity) {
    try {
      const productExistsInCart = await CartModel.exists({ _id: cid, "products.product": pid });
      if (!productExistsInCart) {
        return { message: "Product not found in cart" };
      }

      /* 
			// ALTERNATIVA ESTILO JS
			const cart = await CartModel.findById(cid);

			cart.products.forEach((obj) => {
				if (obj.product.toString() === pid) {
					obj.quantity = quantity;
				}
			});

			await cart.save(); 
			*/

      // ALTERNATIVA ESTILO MONGO/MONGOOSE
      const cart = await CartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": quantity } }, { new: true }).lean();

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      const productExistsInCart = await CartModel.exists({ _id: cid, "products.product": pid });

      if (!productExistsInCart) {
        return { message: "Product not found in cart" };
      }

      const cart = await CartModel.findByIdAndUpdate(cid, { $pull: { product: { product: pid } } }, { new: true }).lean();

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async emptyCart(cid) {
    try {
      const cart = await CartModel.findByIdAndUpdate(cid, { $set: { product: [] } }, { new: true }).lean();

      return cart;
    } catch (error) {
      throw error;
    }
  }
}
