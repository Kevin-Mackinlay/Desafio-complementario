import CustomError from "../customErrors/customError.js";
import { generateInfoProductError } from "../customErrors/info.js";
import typeErrors from "../customErrors/enums.js";

export default class ProductsController {
  constructor(productsService) {
    this.productsService = productsService;
  }

  getProducts = async (req, res) => {
    try {
      const { limit = 6, page = 1, sort, category } = req.query;
      const filter = {
        options: {
          limit,
          page,
        },
      };

      if (category) {
        filter.query = { category };
      }

      if (sort) {
        filter.options.sort = { price: sort };
      }

      const pagesData = await this.productsService.getProducts(filter);

      if (pagesData.docs.length < 1) {
        return res.status(404).json({
          success: false,
          message: "Could not retrieve products",
        });
      }

      res.status(200).json({
        success: true,
        data: pagesData,
      });
    } catch (error) {
      req.logger.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await this.productsService.getProductById(pid);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      req.logger.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  addProduct = async (req, res) => {
    try {
      const { title, description, thumbnail, category, price, stock, code } = req.body;

      if (!title || !description || !category || !thumbnail || !price || !stock || !code) {
        throw CustomError.createError({
          name: "Product creation error",
          cause: generateInfoProductError({ title, description, price, thumbnail, code, stock, category }),
          message: "Error trying to create a product",
          code: typeErrors.INVALID_TYPES_ERROR,
        });
      }

      const newProduct = {
        title,
        description,
        thumbnail,
        category,
        price,
        stock,
        code,
      };
      const result = await this.productsService.addProduct(newProduct);
      req.logger.info(`Producto agregado: ${newProduct.title}`);

      res.status(201).json({ status: "Success", payload: result });
    } catch (error) {
      req.logger.error(`Error al agregar el producto: ${error.message}`);
      res.status(400).json({ error: "Error al agregar el producto", details: error.message });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const updateBody = req.body;
      const product = await this.productsService.getProductById(pid);

      if (!product) {
        return res.status(404).json({ status: "Error", message: "Product not found" });
      }

      if (req.user.role === "premium" && req.user.email !== product.owner) {
        return res.status(403).json({ status: "Error", message: "You are not allowed to update this product" });
      }

      await this.productsService.updateProductById(pid, updateBody);
      res.status(200).json({ status: "Success", message: `Product updated: ${product.title}` });
    } catch (error) {
      req.logger.error(error);
      res.status(500).json({ status: "Error", message: "Internal server error" });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await this.productsService.getProductById(pid);

      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      await this.productsService.deleteProductById(pid);
      res.status(200).json({ success: true, message: `Product with ID ${pid} was deleted.` });
    } catch (error) {
      req.logger.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
}
