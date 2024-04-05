import express from "express";
import passportCall from "../passportJwt/passportCall.js";
import CartController from "../controllers/carts.controller.js";
import authorization from "../passportJwt/authorization.js";

const cartsRouter = express.Router();
const cartsController = new CartController(services.cartsService);

cartsRouter.post("/", authorization(["admin"]), cartsController.createCart);
cartsRouter.get("/", authorization(["admin"]), cartsController.getCarts);
cartsRouter.get("/:cid", authorization(["admin"]), cartsController.getCartById);
cartsRouter.post("/:cid/product/:pid", authorization(["admin"]), cartsController.addAndUpdate);
cartsRouter.delete("/:cid/product/:pid", authorization(["admin"]), cartsController.deleteOne);
cartsRouter.delete("/:cid", authorization(["admin"]), cartsController.deleteAll);

export default cartsRouter;

//localhost:8080/api/carts/65b2feb91d61899a7019226f/65b2d4132440be292ec978c6
