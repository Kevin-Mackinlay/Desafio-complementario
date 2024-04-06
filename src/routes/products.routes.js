import express from "express";
import passportCall  from "../passportJwt/passportCall.js";
import ProductsController from "../controllers/products.controller.js";
import authorization from "../passportJwt/authorization.js";

const productsRouter = express.Router();
const productsController = new ProductsController();

productsRouter.get("/", authorization(["admin"]), productsController.getProducts);
productsRouter.get("/:pid", authorization(["admin"]), productsController.getProductById);
productsRouter.post("/", authorization(["admin"]), productsController.createProduct);
productsRouter.put("/:pid", authorization(["admin"]), productsController.updateProduct);
productsRouter.delete("/:pid", authorization(["admin"]), productsController.deleteProduct);

export default productsRouter;
