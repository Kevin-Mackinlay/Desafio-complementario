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
      const { first_name, last_name, email, password } = req.body;
      if (!first_name || !last_name || !email || !password) {
        CustomError.createError({
          name: "Error creando usuario",
          cause: generateUserErrorInfo(req.body),
          message: "Uno o más campos son inválidos",
          code: EErrors.INVALID_TYPES_ERROR,
        });
      }
      const userDb = await this.service.create(newUser);
      return userDb;
    } catch (error) {
      throw error;
    }
  };
  modify = async (id, user) => {
    try {
      const userDb = await this.service.modify(id, user);
      return userDb;
    } catch (error) {
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
