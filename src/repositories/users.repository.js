export default class UsersRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  async createUser(user) {
    try{
    return await this.userModel.create(user);
    }
    catch(error){
      throw error;
    }
  }

  async getUser(data) {
    try{
    return await this.userModel.findOne(data).lean();
    }
    catch(error){
      throw error;
    }
  }

  async updateUser(id, update, options = { new: true, lean: true }) {
    try{
    return await this.userModel.update(id, update);
  }
    catch(error){
      throw error;
    }
  }

  async deleteUser(id) {
    try{
    return await this.userModel.findByIdAndDelete(id);
}
    catch(error){
      throw error;
    }
  }
}
