import express from "express";
import services from "../services/factory.js";
import ProductsController from "../controllers/products.controller.js";
import authorization from "../config/authorization.js";

const productsRouter = express.Router();
const productsController = new ProductsController(services.productService);

productsRouter.get("/", authorization(["admin"]), productsController.getProducts);
productsRouter.get("/:pid", authorization(["admin"]), productsController.getProductById);
productsRouter.post("/", authorization(["admin"]), productsController.createProduct);
productsRouter.put("/:pid", authorization(["admin"]), productsController.updateProduct);
productsRouter.delete("/:pid", authorization(["admin"]), productsController.deleteProduct);

export default productsRouter;
