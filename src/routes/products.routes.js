import express from "express";
import ProductManager from "../services/db/Products.service.db.js";

const productManager = new ProductManager();
const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, category } = req.query;
    const queryFilter = {
      limit,
      page,
     
      filter:{category},
    };

    if (sort) {
      queryFilter.sort = sort;
    }
    
    const products = await productManager.getProducts();

    if (products.length < 1) {
      res.status(404).json({
        success: false,
        message: "Could not retrieve products",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: limit ? products.slice(0, limit) : products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
productsRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productManager.getProductById(pid);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const { product } = req.body;
    console.log(req);
    const newProduct = await productManager.createProduct(product);

    if (!newProduct) {
      res.status(400).json({
        success: false,
        message: "Could not add the product",
      });
      return;
    }

    const products = await productManager.getProducts();
    // Alternativa a HTTPs
    // req.io.emit("updateProducts", {
    // 	success: true,
    // 	products,
    // });

    res.status(200).json({
      success: true,
      // newProduct: newProduct,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const { product } = req.body;

    const updatedProduct = await productManager.updateProduct(pid, product);

    if (!updatedProduct) {
      res.status(400).json({
        success: false,
        message: "Could not update the product",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    await productManager.deleteProductById(pid);

    const products = await productManager.getProducts();

    res.status(200).json({
      success: true,
      message: `Product with ID ${pid} was deleted.`,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default productsRouter;
