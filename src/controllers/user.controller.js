export default class Users {
  constructor(service) {
    this.service = service;
  }
  get = async () => {
    try {
      const userDb = await this.service.get();
      return userDb;
    } catch (error) {
      throw error;
    }
  };
  create = async (newUser) => {
    try {
      const userDb = await this.service.create(newUser);
      return userDb;
    } catch (error) {
      throw error;
    }
  };
  modify = async (id, user) => {
    try{
        const userDb = await this.service.modify(id, user);
        return userDb;
    }
    catch (error) {
      throw error;
    }
  };

  getUserById = async (id) => {
    try {
      const userDb = await this.service.getUserById(id);
      return userDb;
    } catch (error) {
      throw error;
    }
  };
  delete = async (id) => {
    try {
      const userDb = await this.service.delete(id);
      return userDb;
    } catch (error) {
      throw error;
    }   
  };
}
