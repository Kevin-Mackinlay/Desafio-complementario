import express from "express";
import services from "../services/factory.js";
import ProductsController from "../controllers/products.controller.js";

const productsRouter = express.Router();
const productsController = new ProductsController(services.productService);

productsRouter.get("/", getProducts);
productsRouter.get("/:pid", getProductById);
productsRouter.post("/", postProduct);
productsRouter.put("/:pid", updateProduct);
productsRouter.delete("/:pid", deleteProduct);

export default productsRouter;
