export default class UsersRepository {
  constructor(model) {
    this.userModel = model;
  }

  async create(user) {
    return await this.userModel.create(user);
  }

  async get(searchParams) {
    return await this.userModel.findOne(searchParams).lean();
  }

  async update(searchParams, update, options = { new: true, lean: true }) {
    return await this.userModel.findOneAndUpdate(searchParams, update, options);
  }
}
