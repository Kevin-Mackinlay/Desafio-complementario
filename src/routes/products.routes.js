import express from "express";
import ProductsController from "../controllers/products.controller.js";
import { productService } from "../services/services.js";

const productsRouter = express.Router();
const productsController = new ProductsController(productService);

productsRouter.get("/", productsController.getProducts);
productsRouter.get("/:pid", productsController.getProductById);
productsRouter.post("/", productsController.addProduct);
productsRouter.put("/:pid", productsController.updateProduct);
productsRouter.delete("/:pid", productsController.deleteProduct);

export default productsRouter;
