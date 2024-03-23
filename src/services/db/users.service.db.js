export default class UserService {
  constructor(service) {
    this.productService = service;
  }

  async createUser(user) {
    try {
      const newUser = await this.service.create(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    const user = await this.service.get({ email: email });
    return user;
  }

  async getUserById(id) {
    const user = await this.service.get({ _id: uid });
    return user;
  }

  async getOrCreateUser(userData) {
    const user = await this.service.get({ email: userData.email });
    if (user) {
      return user;
    }
    const newUser = await this.service.create(userData);
    return newUser;
  }
}
