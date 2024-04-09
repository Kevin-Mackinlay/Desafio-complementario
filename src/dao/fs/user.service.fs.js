export default class UsersService {
  constructor() {
    this.data = [];
    this.path = ".dataUser.json";
  }
  create = async ({ firtsName, lastName, userName, email, birthDate, password }) => {
    let user = [{ firtsName, lastName, userName, email, birthDate, password }];

    if (this.path.length > 1) {
      const usersList = await this.get();
      user = [...usersList, { _id: usersList.length + 1, ...user }];
    }

    await fs.promises.writeFile(this.path, JSON.stringify(user, "null", 2), "utf-8");
    return user;
  };

  get = async () => {
    let usersData = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(usersData);
  };

  getByUser = async (userData) => {
    const datos = await this.get();
    return datos.find((user) => user._id == userData._id);
  };

  update = async (uid, updateBody) => {
    const userData = await this.get();
    let userOld = await this.getByUser(uid);
    let index = userData.findIndex((user) => user._id == uid._id);
    const userUpdate = { ...userOld, ...updateBody };

    userData[index] = userUpdate;

    await fs.promises.writeFile(this.path, JSON.stringify(userData, "null", 2), "utf-8");
    return userUpdate;
  };

  delete = async (userDelete) => {
    let userData = await this.get();
    let userFilter = userData.filter((user) => user._id != userDelete._id);

    await fs.promises.writeFile(this.path, JSON.stringify(userFilter, "null", 2));
    return "Removed user";
  };
}





//  async getAllUsers() {
//     try{
//       const users = await this.data;
//       return users;

//     }
//     catch(error){
//       throw error;
//     }
//   }

//   async getByUser(email) {
//     try{
//       const user = await this.data.find((curruser) => curruser.email === email);
//       return user;
//     }
//     catch(error){
//       throw error;
//     }
//   }

//   async getUserById(id) {
//     try{
//       const user = await this.data.find((curruser) => curruser.id === id);
//       return user;

//     }
//     catch(error){
//       throw error;
//     }
//   }


//   createUser = async (newUser) => {
//    try{
//     this.data.push(newUser);
//     return newUser;
//    }
//    catch(error){
//      throw error;
//    }
//   };

//   modifyUser = async (id, user) => {
//     try{
//     const userIndex = this.data.findIndex((curruser) => curruser.id === id);
//     this.data.slice(userIndex, 1, user);
//     return user;
//     }
//     catch(error){
//       throw error;
//     }
//   };

//   deleteUser = async (id) => {
//     try{
//     const userIndex = this.data.findIndex((curruser) => curruser.id === id);
//     const Temporaluser = this.data[userIndex];
//     this.data.slice(userIndex, 1);
//     return Temporaluser;
//   }
//   catch(error){
//     throw error;
//   }
//   };