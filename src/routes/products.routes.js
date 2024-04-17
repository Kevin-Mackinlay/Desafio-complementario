import express from "express";
import passportCall from "../passportJwt/passportCall.js";
import ProductsController from "../controllers/products.controller.js";
import authorization from "../passportJwt/authorization.js";

const productsRouter = express.Router();
const productsController = new ProductsController();

productsRouter.get("/", passportCall("jwt") , productsController.getProducts);
productsRouter.get("/:pid", passportCall("jwt"), productsController.getProductById);
productsRouter.post("/",passportCall("jwt"), authorization(["admin"]), productsController.createProduct);
productsRouter.put("/:pid",passportCall("jwt"), authorization(["admin"]), productsController.updateProduct);
productsRouter.delete("/:pid",passportCall("jwt"),  authorization(["admin"]), productsController.deleteProduct);

export default productsRouter;
