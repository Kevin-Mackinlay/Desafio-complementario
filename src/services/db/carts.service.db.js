
export default class CartsService {
  constructor(serv) {
    this.cartServ = serv;
  }

  async createCart() {
    try {
      const products = [];
      const cart = await this.cartServ.create({ products });

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getCarts() {
    try {
      const carts = await this.cartServ.get();
      return carts;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const cart = await this.cartServ.get(id);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const productExistsInCart = await this.cartServ.existis({ _id: cid, "products.product": pid });
      let cart;
      if (!productExistsInCart) {
        cart = await this.cartServ.update({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } });
      } else {
        cart = await this.cartServ.update({ _id: cid, "products.product": pid },
         { $inc: { "products.$.quantity": 1 } });
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }

async updateProductQuantity(cid, pid, quantity) {
    try {
        const productExistsInCart = await this.cartServ.exists({ _id: cid, "products.product": pid });
        if (!productExistsInCart) {
            throw new Error("Product not found in cart");
        }
        const cart = await this.cartServ.update(
            { _id: cid, "products.product": pid },
            { $set: { "products.$.quantity": quantity } });
        return cart;
    }
    catch (error) {
        throw error;
    }

}

async removeProductFromCart(cid, pid) {
    try {
        const productExistsInCart = await this.cartServ.exists({ _id: cid, "products.product": pid });
        if (!productExistsInCart) {
            throw new Error("Product not found in cart");
        }
        const cart = await this.cartServ.update(
            { _id: cid },
            { $pull: { products: { product: pid } } });
        return cart;
    }
    catch (error) {
        throw error;
    }

}

async emptyCart(cid) { 
    try{
          const cart = await this.cartServ.update({ _id: cid }, { $set: { products: [] } });
            return cart;   
    } catch (error) {
        throw error;
    }
}

}