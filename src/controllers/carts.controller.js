import {logger}  from "../utils/logger.js";

export default class CartsController {
  constructor(CartsService) {
    this.cartsService = CartsService;
  }
  createCart = async (req, res) => {
    try {
      await this.cartsService.createCart({});

      res.status(200).json({
        success: true,
        message: "New empty cart successfully created",
      });
    } catch (error) {
      if (error instanceof CustomError) {
        const errorMessages = {
          [typeErrors.DATABASE_ERROR]: { statusCode: 500, message: "Database Error" },
          [typeErrors.INVALID_CART]: {
            statusCode: 400,
            message: genericInvalidErrorInfo("Invalid cart data", [{ name: "userId", type: "string", value: req.body.userId }]),
          },
        };

        const { statusCode, message } = errorMessages[error.code] || { statusCode: 500, message: error.message };
        res.status(statusCode).json({ success: false, message });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  };

  getCarts = async (req, res) => {
    try {
      const carts = await this.cartsService.getCarts();
      console.log(error);
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
      const { cid } = req.params;
      const cart = await this.cartsService.getCartById(cid);

      if (!cart) {
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
      logger.error(error);
    }
  };

  addAndUpdate = async (req, res) => {
    try {
      const { cid, pid } = req.params;

      const cart = await cartsService.addProductToCart(cid, pid);
      if (!cart) {
        res.status(404).json({
          success: false,
          message: "Cart not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: `Product ${pid} added to cart ${cid}`,
        cart,
      });
    } catch (error) {
      logger.error(error);
    }
  };

  deleteOne = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartsService.deleteProduct(cid, pid);

      if (!cart) {
        res.status(404).json({
          success: false,
          message: "Cart not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: `Product ${pid} removed from cart ${cid}`,
        cart,
      });
    } catch (error) {
      logger.error(error);
    }
  };

  deleteAll = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartsService.deleteAllProd(cid);

      if (!cart) {
        res.status(404).json({
          success: false,
          message: "Cart not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: `All products removed from cart ${cid}`,
        cart,
      });
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
