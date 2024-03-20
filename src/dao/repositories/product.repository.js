export default class ProductsRepository {
  constructor(model) {
    this.productModel = model;
  }

  async create(product) {
    return await this.productModel.create(product);
  }

  async get(searchParams) {
    return await this.productModel.find(searchParams).lean();
  }

  async getPaginated(filter) {
    filter.options.lean = true;
    const pagesData = await this.productModel.paginate(filter.query, filter.options);

    return pagesData;
  }

  async delete(searchParams) {
    return await this.productModel.findOneAndDelete(searchParams);
  }

  async update(searchParams, update, options = { new: true, lean: true }) {
    return await this.productModel.findOneAndUpdate(searchParams, update, options);
  }
}
