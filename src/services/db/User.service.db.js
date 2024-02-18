import UserModel from "../../dao/models/user.model.js"; 

export default class UserService {
  createUser(user) {
    const newUser = UserModel.create(user);
    return newUser;
  }

  getUserByEmail(email) {
    const user = UserModel.findOne({email}).lean();
    return user;

  }
}