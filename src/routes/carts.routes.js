import express from "express";
import CartController from "../controllers/carts.controller.js";
import services from "../services/factory.js";
const cartsController = new CartController(services.cartsService);
const cartsRouter = express.Router();

cartsRouter.post("/", createCart);
cartsRouter.get("/", getCarts);
cartsRouter.get("/:cid", getCartById);
cartsRouter.post("/:cid/product/:pid", addProductToCart);
cartsRouter.put("/:cid/product/:pid", updateCart);
cartsRouter.delete("/:cid/product/:pid", deleteProductFromCart);
cartsRouter.delete("/:cid", deleteCart);

export default cartsRouter;


//localhost:8080/api/carts/65b2feb91d61899a7019226f/65b2d4132440be292ec978c6