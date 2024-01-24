import ProductModel from "../../dao/models/product.model.js";

export default class ProductsManager {
  async createProduct(product) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async getProducts(filter) {
    try {
      filter.options.lean = true
      const products = await ProductModel.paginate(filter.query, filter.option); // {limit: 10, page: 1, sort: { price:1;}, filter: { category: "category" }};
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
      return
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, productUpdates) {
    try {
      const product = await ProductModel.findByIdAndUpdate(id, productUpdates, { new: true }).lean();
      return product;
    } catch (error) {
      throw error;
    }
  }
}
