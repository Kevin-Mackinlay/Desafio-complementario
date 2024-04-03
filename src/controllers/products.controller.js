import { logger } from "../utils/logger.js";
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
      const pagesData = await this.productsService.getPaginatedProducts(filter);

      if (pagesData.products.length < 1) {
        res.status(404).json({
          success: false,
          message: "Could not retrieve products",
        });
        return;
      }

      //console.log(pagesData);
      res.status(200).json({
        success: true,
        data: pagesData,
      });
    } catch (error) {
      logger.error(error);
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
      logger.error(error);
    }
  };

  createProduct = async (req, res) => {
    try {
      const { title, description, price, thumbnails, stock } = req.body;
      const code = uuidv4();
      const owner = req.user.email;

      //validacion si los campos estan vacios
      if (!title || !description || !price || !thumbnails || !stock) {
        throw CustomError.createError({
          name: "Error creating product",
          cause: generateInfoProductError({ title, description, price, thumbnails, stock }),
          message: "Error trying to create a product",
          code: typeErrors.INVALID_TYPE_ERROR,
        });
      }

      //validacion si el code del producto ya existe
      if(await this.productsService.getProduct({code})){
        CustomError.createError({
          name: "Error creating product",
          cause: generateInfoProductError({title, description, price, thumbnails, stock}),
          message: "Existing code error",
          code: typeErrors.INVALID_TYPE_ERROR,
      })
    } 
    let result = await this.productsService.createProduct({ title, description, price, thumbnails, stock, code, owner });
    result
       ? res.status(200).send({ status: "A product has been created successfully", payload: result })
            : res.status(404).send({ status:"Error", error: "Something went wrong" })
   } catch (error) {
    next(error);
      logger.error(error);
    }
  };

  updateProduct = async (req, res) => {
   try{
    let { pid } = req.params;
    let updateBody = req.body;
    const product = await this.productsService.getProductById({_id: pid})

    if(!product) return
      res.status(404).send({ status: "Error", error: "Product not found" })
    
      const updateProduct = async(pid, updateBody) => {
        await this.productsService.updateProductById(pid, updateBody)
        res.status(200).send({ status: "Product has been updated successfully",
        message:`The product was updated ${product.title}`
       })
   }
if(req.user.role === "premium") {
  req.user.email !== product.owner ?
   res.status(403).send({ status: "Error",
    message: "You are not allowed to update this product" }) : updateProduct(pid, updateBody)
}
else {
  updateProduct(pid, updateBody)
}

}
catch(error) {
  logger.error(error);
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
        message: `The product was deleted ${product.title}`
      });
    };

    if (req.user.role === "premium") {
      if (req.user.email !== product.owner) {
        return res.status(403).send({
          status: "Error",
          message: "You are not allowed to delete this product"
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
        </div>`
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

}