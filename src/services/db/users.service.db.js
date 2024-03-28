export default class UserService {
  constructor(repo) {
    this.repo = repo;
  }

  async createUser(user) {
    try {
      const newUser = await this.repo.create(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await this.repo.get();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    const user = await this.service.get({ email: email });
    return user;
  }

  async getUserById(id) {
    const user = await this.repo.get({ _id: uid });
    return user;
  }

  async modifyUser(id, user) {
    const userDb = await this.repo.modify(id, user);
    return userDb;
  }

  async deleteUser(id) {
    const userDb = await this.repo.delete(id);
    return userDb;
  }

}
