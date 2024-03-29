import express from "express";
import services from "../services/factory.js";
import CartController from "../controllers/carts.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import authorization from "../config/authorization.js";

const cartsRouter = express.Router();
const cartsController = new CartController(services.cartsService);


cartsRouter.post("/", authorization(["admin"]), cartsController.createCart);
cartsRouter.get("/", authorization(["admin"]), cartsController.getCarts);
cartsRouter.get("/:cid", authorization(["admin"]), cartsController.getCart);
cartsRouter.post("/:cid/product/:pid", authorization(["admin"]), cartsController.addProductToCart);
cartsRouter.put("/:cid/product/:pid", authorization(["admin"]), cartsController.updateProductQuantity);
cartsRouter.delete("/:cid/product/:pid", authorization(["admin"]), cartsController.removeProductFromCart);
cartsRouter.delete("/:cid", authorization(["admin"]), cartsController.deleteCart);

export default cartsRouter;

//localhost:8080/api/carts/65b2feb91d61899a7019226f/65b2d4132440be292ec978c6
