export default class UsersService {
  constructor() {
    this.data = [];
  }

  async getAllUsers() {
    try{
      const users = await this.data;
      return users;

    }
    catch(error){
      throw error;
    }
  }

  async getUserByEmail(email) {
    try{
      const user = await this.data.find((curruser) => curruser.email === email);
      return user;
    }
    catch(error){
      throw error;
    }
  }

  async getUserById(id) {
    try{
      const user = await this.data.find((curruser) => curruser.id === id);
      return user;

    }
    catch(error){
      throw error;
    }
  }


  createUser = async (newUser) => {
   try{
    this.data.push(newUser);
    return newUser;
   }
   catch(error){
     throw error;
   }
  };

  modifyUser = async (id, user) => {
    try{
    const userIndex = this.data.findIndex((curruser) => curruser.id === id);
    this.data.slice(userIndex, 1, user);
    return user;
    }
    catch(error){
      throw error;
    }
  };

  deleteUser = async (id) => {
    try{
    const userIndex = this.data.findIndex((curruser) => curruser.id === id);
    const Temporaluser = this.data[userIndex];
    this.data.slice(userIndex, 1);
    return Temporaluser;
  }
  catch(error){
    throw error;
  }
  };
}
