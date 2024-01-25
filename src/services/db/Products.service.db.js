import ProductModel from "../../dao/models/product.model.js";
export default class ProductsManager {
  async createProduct(product) {
    try {
      const newProduct = await ProductModel.create(product);

      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async getProducts() {
    try {
      const products = await ProductModel.find().lean();

      return products;
    } catch (error) {
      throw error;
    }
  }

  async getPaginatedProducts(filter) {
    try {
      filter.options.lean = true;
      const products = await ProductModel.paginate(filter.query, filter.options);
      // products.status = "success" para que el status de la respuesta sea success
      products.status = "success";

      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id).lean();

      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductById(id) {
    try {
      const product = await ProductModel.findByIdAndDelete(id).lean();

      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, productUpdates) {
    // {title: "nuevo titulo"}
    try {
      const product = await ProductModel.findByIdAndUpdate(id, productUpdates, { new: true }).lean();

      return product;
    } catch (error) {
      throw error;
    }
  }
}
