import userModel from "./models/user.schema.js";

export default class Users {
    constructor() {}
    
    get = async () => {
        return await userModel.find();
    };
    
    create = async () => {
        const newUser = new userModel(user);
        await newUser.save();
        return newUser;
    };
    
    modify = async (id, user) => {
        return await userModel.finByIdAndUpdate(id, user, { new: true });
    };
    
    delete = async (id) => {
        return await userModel.findByIdAndDelete(id);
    };
    }   // End of Users class


    