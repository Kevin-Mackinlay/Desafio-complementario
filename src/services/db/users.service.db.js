export default class UserService {
  constructor(serv) {
    this.serv = serv;
  }

  async createUser(user) {
    try {
      const newUser = await this.serv.create(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    const user = await this.serv.get({ email: email });
    return user;
  }

  async getUserById(id) {
    const user = await this.serv.get({ _id: uid });
    return user;
  }

  async getOrCreateUser(userData) {
    const user = await this.serv.get({ email: userData.email });
    if (user) {
      return user;
    }
    const newUser = await this.serv.create(userData);
    return newUser;
  }
}
