import UserModel from "../../dao/models/user.model.js"; 

export default class UserService {
   async createUser(user) {
    const newUser = await UserModel.create(user);
    return newUser;
  }

  async getUserByEmail(email) {
    const user = await  UserModel.findOne({email}).lean();
    return user;

  }

  async getUserById(id) {
    const user =  await UserModel.findById(id).lean(); 
    return user;
  }
}