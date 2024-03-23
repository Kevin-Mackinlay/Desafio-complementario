import express from "express";
import CartController from "../controllers/carts.controller.js";
import services from "../services/factory.js";
const cartsController = new CartController(services.cartsService);
const cartsRouter = express.Router();

cartsRouter.post("/", cartsController.createCart);
cartsRouter.get("/", cartsController.getCarts);
cartsRouter.get("/:cid", cartsController.getCart);
cartsRouter.post("/:cid/product/:pid", cartsController.addProductToCart);
cartsRouter.put("/:cid/product/:pid", cartsController.updateProductQuantity);
cartsRouter.delete("/:cid/product/:pid", cartsController.removeProductFromCart);
cartsRouter.delete("/:cid", cartsController.deleteCart);

export default cartsRouter;

//localhost:8080/api/carts/65b2feb91d61899a7019226f/65b2d4132440be292ec978c6
