import express from "express";
import CartController from "../controllers/carts.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const cartsRouter = express.Router();
const cartsController = new CartController();

cartsRouter.post("/", isAuthenticated(["admin"]), cartsController.createCart);
cartsRouter.get("/", isAuthenticated(["admin"]), cartsController.getCarts);
cartsRouter.get("/:cid", isAuthenticated(["admin"]), cartsController.getCartById);
cartsRouter.post("/:cid/product/:pid", isAuthenticated(["user", "premium"]), cartsController.addProduct);
cartsRouter.delete("/:cid/product/:pid", isAuthenticated(["user", "premium"]), cartsController.deleteProductInCart);
cartsRouter.post("/:cid/purchase", cartsController.cartPurchase);
cartsRouter.delete("/:cid", cartsController.deleteProductsInCart);

export default cartsRouter;

//localhost:8080/api/carts/65b2feb91d61899a7019226f/65b2d4132440be292ec978c6
