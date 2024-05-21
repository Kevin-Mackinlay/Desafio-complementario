import { logger } from "../utils/logger.js";
import objectConfig from "../config/objectConfig.js";
import transport from "../utils/nodeMailer.js";
import { v4 as uuidv4 } from "uuid";
import ProductServiceDb from "../dao/db/products.service.db.js";
import TicketService from "../dao/db/ticket.service.db.js";

export default class CartsController {
  constructor(CartService) {
    this.cartService = CartService;
  }
  createCart = async (req, res) => {
    try {
      console.log(1);
      const result = await this.cartService.createCart();
      console.log(result);
      result ? res.status(200).json({ status: "the cart was created successfully", payload: result }) : res.status(404).json({ status: "Error", message: "The cart was not created" });
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  };

  getCarts = async (req, res) => {
    try {
      const carts = await this.cartService.getCarts();

      res.status(200).json({
        success: true,
        data: carts,
      });
    } catch (error) {
      logger.error(error);
    }
  };

  getCartById = async (req, res) => {
    try {
      console.log(1);
      const { cid } = req.params;
      const cart = await this.cartService.getCartById(cid);
      console.log(2);
      if (!cart) {
        console.log(3);
        res.status(404).json({
          
          success: false,
          message: "Cart not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  };
addProduct = async (req, res) => {
  try {
    let { cid, pid } = req.params;
    const cart = await this.cartService.getCartByID(cid);
    const product = await ProductServiceDb.getProduct({ _id: pid });

    if (!product)
      return res.status(404).send({
        status: "Error",
        message: "The product does not exist",
      });

    if (!cart)
      return res.status(404).send({
        status: "Error",
        message: "The cart does not exist",
      });

    if (product.stock < 1)
      return res.status(404).send({
        status: "Error",
        message: "The product does not have enough stock",
      });

    if (cart && product) {
      await this.cartService.addProductAndUpdate(cid, pid);

      res.status(200).send({
        status: "The cart was updated successfully",
        message: `The product ${product.title} was added to the cart`,
      });
    }
  } catch (error) {
    console.log(error);
    logger.error(error);
    res.status(500).send({
      status: "Error",
      message: "Failed to add product to cart",
    });
  }
};


  deleteProductInCart = async (req, res) => {
    try {
      let { cid, pid } = req.params;
      let cart = await cartService.deleteProduct(cid, pid);

      if (!cart) {
        res.status(404).send({
          status: "error",
          message: "Cart o product not found",
        });
      } else {
        res.status(200).send({
          status: "success",
          message: "the product is removed from the cart",
          payload: cart,
        });
      }
    } catch (error) {
      logger.error(error);
    }
  };

  deleteProductsInCart = async (req, res) => {
    try {
      let { cid } = req.params;
      let cart = await cartService.deleteAllProd(cid);

      if (!cart) return res.status(404).send({ status: "error", message: "Cart not found" });

      res.status(200).send({
        status: "success",
        message: "The cart was emptied successfully",
        payload: cart,
      });
    } catch (error) {
      logger.error(error);
    }
  };

  cartPurchase = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartService.getCartByID(cid);
      const insufficientStock = [];
      const buyProducts = [];

      if (!cart) return res.status(404).send({ status: "Error", message: "Cart not found" });

      cart.products.forEach(async (item) => {
        const product = item.product;
        const quantity = item.quantity;
        const stock = item.product.stock;

        quantity > stock ? insufficientStock.push(product) : buyProducts.push({ product, quantity }) && (await ProductServiceDb.updateProduct(product, { stock: stock - quantity })) && (await cartService.deleteProduct(cart, product));
      });

      const totalAmount = buyProducts.reduce((acc, item) => acc + item.quantity, 0);
      const totalPrice = buyProducts.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(3);

      if (!buyProducts.length) {
        return res.status(404).send({
          status: "Error",
          message: "Insufficient stock in the products",
          products: insufficientStock.map((prod) => prod.title),
        });
      }

      if (buyProducts.length > 0) {
        const ticket = await TicketServiceDb.createTicket({
          code: uuidv4(),
          amount: totalAmount,
          purchaser: req.user.email,
        });

        await transport.sendMail({
          from: objectConfig.EMAIL_USER,
          to: req.user.email,
          subject: "Thanks for your purchase",
          html: `<div>
                                <h1>
                                    Thanks for your purchase.
                                    the total to pay is ${totalPrice}$
                                </h1>
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

        return res.send({ status: "Success", message: "Successful purchase", toTicket: ticket });
      }
    } catch (error) {
      logger.error(error);
    }
  };
}
//   cartPurchase = async (req, res) => {
//     try {
//       const { cid } = req.params;
//       const cart = await cartsService.getCartById(cid);
//       const insufficientStock = [];
//       const buyProducts = [];

//       if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });
//       cart.products.forEach(async (item) => {
//         const product = item.product;
//         const quantity = item.quantity;
//         const stock = product.stock;

//         quantity > stock ? insufficientStock.push(product) : buyProducts.push({ product, quantity }) && (await productsService.updateProduct(product, { stock: stock - quantity })) && (await cartsService.removeProductFromCart(cart, product));
//       });

//       const totalAmount = buyProducts.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
//       const totalPrice = buyProducts.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(3);

//       if (!buyProducts.length)
//         return res.status(400).json({
//           status: "Error",
//           message: "No products were purchased",
//         });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   };
// }

//   if(buyProducts.length > 0){
//               const ticket = await ticketService.createTicket({
//                   code: uuidv4(),
//                   amount: totalAmount,
//                   purchaser: req.user.email,
//               })

//               await transport.sendMail({
//                   from: objectConfig.gmailUser,
//                   to: req.user.email,
//                   subject: "Thanks for your purchase",
//                   html:`<div>
//                               <h1>
//                                   Thanks for your purchase.
//                                   the total to pay is ${totalPrice}$
//                               </h1>
//                               <img src="cid:gracias-por-comprar">
//                         </div>`,
//                   attachments:[{
//                       filename:'gracias-por-comprar.jpg',
//                       path:"src/public/images/gracias-por-comprar.jpg",
//                       cid:'gracias-por-comprar'
//                   }]
//               })

//               return res.send({status:"Success", message:"Successful purchase", toTicket: ticket})
//           }
//       } catch (error) {
//           logger.error(error)

//       }
//   }
// });
