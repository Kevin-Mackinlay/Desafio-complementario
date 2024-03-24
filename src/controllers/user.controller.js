export default class UsersController {
  constructor(service) {
    this.usersService = service;
  }
  getUsers = async () => {
    try {
     
      const userDb = await this.service.get();
      return userDb;
    } catch (error) {
      throw error;
    }
  };
  createUser = async (newUser) => {
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
  modifyUser = async (id, user) => {
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
  deleteUser = async (id) => {
    try {
      const userDb = await this.service.delete(id);
      return userDb;
    } catch (error) {
      throw error;
    }
  };
}
