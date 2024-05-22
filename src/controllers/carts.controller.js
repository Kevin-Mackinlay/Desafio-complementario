import { logger } from "../utils/logger.js";
import objectConfig from "../config/objectConfig.js";
import transport from "../utils/nodeMailer.js";
import { v4 as uuidv4 } from "uuid";

import ProductServiceDb from "../dao/db/products.service.db.js";



export default class CartsController {
  constructor(CartService) {
    this.cartService = CartService;
  }

  createCart = async (req, res) => {
    try {
      const result = await this.cartService.createCart();
      result ? res.status(200).json({ status: "the cart was created successfully", payload: result }) : res.status(404).json({ status: "Error", message: "The cart was not created" });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ status: "Error", message: "Internal server error" });
    }
  };

  getCarts = async (req, res) => {
    try {
      const carts = await this.cartService.getCarts();
      res.status(200).json({ success: true, data: carts });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  getCartById = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await this.cartService.getCartById(cid);
      if (!cart) {
        return res.status(404).json({ success: false, message: "Cart not found" });
      }
      res.status(200).json({ success: true, data: cart });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  addProductToCart = async (req, res) => {
    try {
      //obteniedo el id del carrito y del producto
      const cartId = req.params.cid;
      const productId = req.params.pid;
      // obteniendo id del usuario
      const userId = req.user._id;

      // Obteniendo el producto por su ID
      const product = await ProductServiceDb.getProductById(productId);

      //Verificando si el usuario es el dueño del producto
// Verificando si el usuario es premium y es el dueño del producto
		if (product.owner == userId && req.user.role == 'user') {
			req.logger.info(`El usuario premium ${userId} intentó agregar su propio producto ${productId} al carrito ${cartId}`);
			res.status(400).json({status:'error: un usuario premium no puede agregar su propio producto al carrito'});
    
    } else {
      //agregando el producto al carrito
      const addedProduct = await this.cartService.addAndUpdate(cartId, productId);
      req.logger.info(`Producto ${productId} agregado al carrito ${cartId}`);
      //enviando una respuesta al cliente
      res.status(200).json({ status: "Success", message: "Product added to cart successfully", payload: addedProduct });
    }
  }catch (error) {
    req.logger.error(`Error al agregar el producto al carrito: ${error.message}`);
    res.status(400).json({ status: "Error", message: "Failed to add product to cart" });
  }	
  };

    
    
    
    

  deleteProductInCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await this.cartService.deleteOne(cid, pid);

      if (!cart) {
        return res.status(404).json({ status: "error", message: "Cart or product not found" });
      }

      res.status(200).json({ status: "success", message: "The product was removed from the cart", payload: cart });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };

  deleteProductsInCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await this.cartService.deleteAll(cid);

      if (!cart) {
        return res.status(404).json({ status: "error", message: "Cart not found" });
      }

      res.status(200).json({ status: "success", message: "The cart was emptied successfully", payload: cart });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };

  cartPurchase = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await this.cartService.getCartById(cid);

      if (!cart) {
        return res.status(404).json({ status: "Error", message: "Cart not found" });
      }

      const insufficientStock = [];
      const buyProducts = [];

      for (const item of cart.products) {
        const product = await ProductServiceDb.getProductById(item.product._id);
        const quantity = item.quantity;

        if (quantity > product.stock) {
          insufficientStock.push(product.title);
        } else {
          buyProducts.push({ product, quantity });
          await ProductServiceDb.updateProduct(product._id, { stock: product.stock - quantity });
          await this.cartService.deleteOne(cart._id, product._id);
        }
      }

      if (insufficientStock.length) {
        return res.status(400).json({ status: "Error", message: "Insufficient stock in the products", products: insufficientStock });
      }

      if (buyProducts.length) {
        const totalAmount = buyProducts.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = buyProducts.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);

        const ticket = await TicketService.createTicket({
          code: uuidv4(),
          amount: totalAmount,
          purchaser: req.user.email,
        });

        await transport.sendMail({
          from: objectConfig.EMAIL_USER,
          to: req.user.email,
          subject: "Thanks for your purchase",
          html: `<div>
                  <h1>Thanks for your purchase. The total to pay is ${totalPrice}$</h1>
                  <img src="cid:gracias-por-comprar">
                </div>`,
          attachments: [
            {
              filename: "gracias-por-comprar.jpg",
              path: "src/public/images/gracias-por-comprar.jpg",
              cid: "gracias-por-comprar",
            },
          ],
        });

        return res.status(200).json({ status: "Success", message: "Successful purchase", ticket });
      }
    } catch (error) {
      logger.error(error);
      res.status(500).json({ status: "Error", message: "Internal server error" });
    }
  };
}
