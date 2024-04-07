import express from "express";
import {passportCall} from "../passportJwt/passportCall.js";
import CartController from "../controllers/carts.controller.js";
import authorization from "../passportJwt/authorization.js";

const cartsRouter = express.Router();
const cartsController = new CartController();

cartsRouter.post("/", passportCall("jwt"), authorization(["admin"]), cartsController.createCart);
cartsRouter.get("/",passportCall("jwt"), authorization(["admin"]), cartsController.getCarts);
cartsRouter.get("/:cid", passportCall("jwt"),  cartsController.getCartById);
cartsRouter.post("/:cid/product/:pid", passportCall("jwt"), authorization(["admin"]), cartsController.addProduct);
cartsRouter.delete("/:cid/product/:pid", passportCall("jwt"), authorization(["admin"]), cartsController.deleteProductInCart);
cartsRouter.delete("/:cid", passportCall("jwt"), authorization(["admin"]), cartsController.deleteProductsInCart);

export default cartsRouter;

//localhost:8080/api/carts/65b2feb91d61899a7019226f/65b2d4132440be292ec978c6
