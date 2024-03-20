export default class CartsRepository {
  constructor(model) {
    this.CartModel = model;
  }

  async create(cart) {
    return await this.CartModel.create(cart);
  }

  async get(searchParams) {
    return await this.CartModel.findOne(searchParams).lean();
  }

  async exists(searchParams) {
    return await this.CartModel.exists(searchParams).lean();
  }

  async update(searchParams, update, options = { new: true, lean: true }) {
    return await this.CartModel.findOneAndUpdate(searchParams, update, options);
  }
}
