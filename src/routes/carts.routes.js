import express from "express";
import CartsService from "../services/db/Carts.service.db.js";
import { createCart, getCarts, addProductToCart, deleteCart, deleteProductFromCart, getCartById } from "../controller/carts.controller.js";

const cartsService = new CartsService();

const cartsRouter = express.Router();

cartsRouter.post("/", createCart());


cartsRouter.get("/", getCarts());
  // try {
  //   const carts = await cartsService.getCarts();
  //   res.status(200).json({ carts });
  // } catch (error) {
  //   console.log(error.message);
  // }


cartsRouter.get("/:cid", getCartById());
  // try {
  //   const { cid } = req.params;
  //   const cart = await cartsService.getCartById(cid);

  //   if (!cart) {
  //     res.status(404).json({
  //       success: false,
  //       message: "Cart not found",
  //     });
  //     return;
    

  //   res.status(200).json({
  //     success: true,
  //     message: "Cart sent",
  //     cart,
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: error.message,
  //   });
  // }

cartsRouter.post("/:cid/product/:pid", addProductToCart());
  // try {
  //   const { cid, pid } = req.params;

  //   const cart = await cartsService.addProductToCart(cid, pid);
  //   if (!cart) {
  //     res.status(404).json({
  //       success: false,
  //       message: "Cart not found",
  //     });
  //     return;
  //   }
  //   res.status(200).json({
  //     success: true,
  //     message: `Product ${pid} added to cart ${cid}`,
  //     cart,
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: error.message,
  //   });
  // }


// cartsRouter.put("/:cid/product/:pid", async (req, res) => {
  // try {
  //   const { quantity } = req.body;
  //   const { cid, pid } = req.params;

  //   const cart = await cartsService.updateProductQuantity(pid, cid, quantity);
  //   if (!cart) {
  //     return res.status(404).json({
  //       success: false,
  //       message: "Cart not found",
  //     });
  //   }
  //   res.status(200).json({
  //     success: true,
  //     message: `Product ${pid}'s quantity was modified ${cid}`,
  //     cart,
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: error.message,
  //   });
  // }


cartsRouter.delete("/:cid/product/:pid", deleteProductFromCart());
  // try {
  //   const { cid, pid } = req.params;

  //   const cart = await cartsService.deleteProductFromCart(cid, pid);

  //   if (!cart) {
  //     return res.status(404).json({
  //       success: false,
  //       message: "Cart not found",
  //     });
  //   }

  //   return res.status(200).json({
  //     success: true,
  //     message: `Product ${pid} deleted from cart ${cid}`,
  //     cart,
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: error.message,
  //   });
  // }


cartsRouter.delete("/:cid", deleteCart());
  // const { cid } = req.params;

  // try {
  //   await cartsService.emptyCart(cid);

  //   res.status(200).json({
  //     success: true,
  //     message: `Cart ${cid} was emptied`,
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: error.message,
  //   });
  // }


export default cartsRouter;
