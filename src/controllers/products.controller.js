import CustomError from "../customErrors/customError.js";
import { generateInfoProductError } from "../customErrors/info.js";
import typeErrors from "../customErrors/enums.js";

export default class ProductsController {
  constructor(ProductsService) {
    this.productsService = ProductsService;
  }

  getProducts = async (req, res) => {
    try {
      const { limit = 8, page = 1, sort, category } = req.query;
      const filter = {
        options: {
          limit,
          page,
        },
      };

      if (category) {
        filter.query = { category: category };
      }

      if (sort) {
        filter.options.sort = { price: sort };
      }
      console.log(1);
      const pagesData = await this.productsService.getProducts(filter);

      if (pagesData.docs.length < 1) {
        console.log(2);
        res.status(404).json({
          success: false,
          message: "Could not retrieve products",
        });
        return;
      }

      console.log(2); //console.log(pagesData);

      res.status(200).json({
        success: true,
        data: pagesData,
      });
    } catch (error) {
      console.log(error);
      req.logger.error(error);
    }
  };

  getProductById = async (req, res) => {
    try {
      const { pid } = req.params;

      const product = await this.productsService.getProductById(pid);

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
      req.logger.error(error);
    }
  };
  addProduct = async (req, res) => {
    try {
      const { product } = req.body;
      console.log(req.body);

      // Assuming `create` expects a product object
      const newProduct = await this.productsService.addProduct(product);
      console.log(newProduct);
      if (!newProduct) {
        res.status(400).json({
          success: false,
          message: "Could not add the product",
        });
        return;
      }

      const products = await this.productsService.getProducts();
      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  // createProduct = async (req, res, next) => {
  //   try {
  //     const { title, description, price, thumbnails, stock } = req.body;
  //     const code = uuidv4();
  //     const owner = req.user.email;

  //     // Validation for empty fields
  //     if (!title || !description || !price || !thumbnails || !stock) {
  //       throw CustomError.createError({
  //         name: "Error creating product",
  //         cause: generateInfoProductError({ title, description, price, thumbnails, stock }),
  //         message: "Error trying to create a product",
  //         code: typeErrors.INVALID_TYPE_ERROR,
  //       });
  //     }

  //     // Validation if product code already exists
  //     if (await this.productsService.getProduct({ code })) {
  //       CustomError.createError({
  //         name: "Error creating product",
  //         cause: generateInfoProductError({ title, description, price, thumbnails, stock }),
  //         message: "Existing code error",
  //         code: typeErrors.INVALID_TYPE_ERROR,
  //       });
  //     }

  //     let result = await this.productsService.createProduct({
  //       title,
  //       description,
  //       price,
  //       thumbnails,
  //       stock,
  //       code,
  //       owner,
  //     });

  //     if (result) {
  //       res.status(200).send({ status: "A product has been created successfully", payload: result });
  //     } else {
  //       res.status(404).send({ status: "Error", error: "Something went wrong" });
  //     }
  //   } catch (error) {
  //     next(error); // Now 'next' is defined in the function parameters
  //     req.logger.error(error);
  //   }
  // };

  updateProduct = async (req, res) => {
    try {
      let { pid } = req.params;
      let updateBody = req.body;
      const product = await this.productsService.getProductById({ _id: pid });

      if (!product) return;
      res.status(404).send({ status: "Error", error: "Product not found" });

      const updateProduct = async (pid, updateBody) => {
        await this.productsService.updateProductById(pid, updateBody);
        res.status(200).send({
          status: "Product has been updated successfully",
          message: `The product was updated ${product.title}`,
        });
      };
      if (req.user.role === "premium") {
        req.user.email !== product.owner ? res.status(403).send({ status: "Error", message: "You are not allowed to update this product" }) : updateProduct(pid, updateBody);
      } else {
        updateProduct(pid, updateBody);
      }
    } catch (error) {
      req.logger.error(error);
    }
  };

  deleteProduct = async (req, res) => {
    try {
      let { pid } = req.params;
      let product = await this.productsService.getProductById({ _id: pid });

      if (!product) {
        return res.status(404).send({ status: "Error", error: "Product not found" });
      }

      const removeProduct = async (pid) => {
        await productsService.deleteProductById(pid);
        res.status(200).send({
          status: "Product has been deleted successfully",
          message: `The product was deleted ${product.title}`,
        });
      };

      if (req.user.role === "premium") {
        if (req.user.email !== product.owner) {
          return res.status(403).send({
            status: "Error",
            message: "You are not allowed to delete this product",
          });
        } else {
          removeProduct(pid);
        }
      } else {
        removeProduct(pid);
        await transport.sendMail({
          from: process.env.EMAIL,
          to: product.owner,
          subject: "Product deleted",
          html: `<div>
          <h1>Hi user, your product was removed by the admin</h1>
        </div>`,
        });
      }
    } catch (error) {
      req.logger.error(error);
    }
  };
}
