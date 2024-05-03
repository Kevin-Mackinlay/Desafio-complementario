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
      console.log(pid, product);
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
      req.logger.error(error);
    }
  };
  addProduct = async (req, res) => {
    try {
      const { title, description, thumbnail, category, price, stock, code } = req.body;
      console.log(req.body);

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
      }; // Agregar el producto y registrar el resultado
      const result = await this.productsService.addProduct(newProduct);
      req.logger.info(`Producto agregado: ${newProduct.title}`);

      res.status(201).send({ status: "Sucess: Producto agregado", payload: result });
    } catch (error) {
      req.logger.error(`Error al agregar el producto: ${error.message}`);
      // Enviar respuesta de error
      res.status(400).send({ error: "Error al agregar el producto", details: error.message });
    }
  };

  //     // Assuming `create` expects a product object
  //     const newProduct = await this.productsService.addProduct(product);
  //     console.log(newProduct);
  //     if (!newProduct) {
  //       res.status(400).json({
  //         success: false,
  //         message: "Could not add the product",
  //       });
  //       return;
  //     }

  //     const products = await this.productsService.getProducts();
  //     res.status(200).json({
  //       success: true,
  //       products,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({
  //       success: false,
  //       message: error.message,
  //     });
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
      // Comment: validar que el usuario premium solo pueda borrar sus productos
      const { pid } = req.params;

      // if (req.user.role == "premium") {
        const product = await this.productsService.getProductById(pid);
    if (!product) {
      
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
        // if (product.owner != req.user._id) {
        //   return res.status(403).json({
        //     success: false,
        //     message: "Forbidden",
        //   });
        // }
      // }

      await this.productsService.deleteProductById(pid);

      const products = await this.productsService.getProducts();

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
  };
}