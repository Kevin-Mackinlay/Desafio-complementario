import express from "express";
import services from "../services/factory.js";
import ProductsController from "../controllers/products.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const productsRouter = express.Router();
const productsController = new ProductsController(services.productService);

productsRouter.get("/", isAuthenticated(["admin"]), productsController.getProducts);
productsRouter.get("/:pid", isAuthenticated(["admin"]), productsController.getProductById);
productsRouter.post("/", isAuthenticated(["admin"]), productsController.createProduct);
productsRouter.put("/:pid", isAuthenticated(["admin"]), productsController.updateProduct);
productsRouter.delete("/:pid", isAuthenticated(["admin"]), productsController.deleteProduct);

export default productsRouter;
