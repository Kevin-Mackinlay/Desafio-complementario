import { logger } from "../utils/logger";
import { transport } from "winston";



export default class SessionsController {

  signup = async (req, res) => {
    try{
      const {firstName, lastName, userName, email, birthDate, password} = req.body;
      if(!firstName || !lastName || !userName || !email || !birthDate || !password){
        res.status(400).send({ status: "error", message: "Fill in the missing fields" });
      }
      if(await this.userService.getUserByEmail(email)){
        res.status(400).json({message: "El usuario ya existe"});
      }
      const newUser = await this.userService.createUser(req.body);
      res.status(201).json({message: "Usuario creado", user: newUser});

    }
    catch(error){
      res.status(500).json({message: error.message});
    }
  }


  login = async (req, res) => {
    if (!req.loginSuccess) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({ success: true, message: "User logged in", redirectUrl: "/products" });
  };


  logout = async (req, res) => {
    try {
      req.session.destroy((error) => {
        if (error) {
          console.log(error);
          res.status(500).json({ success: false, message: "Internal server error" });
        } else {
          res.status(200).json({ success: true, message: "User logged out", redirectUrl: "/login" });
        }
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
    infoCurrent = async(req,res) => {
        try {
            const {email} = req.user
            const contact = await contactService.getContact({email})
    
            contact 
            ? res.status(200).send({status:"success", toInfo: contact}) 
            : res.status(404).send({status:"Error", message:"Your information does not exist"})
        } catch (error) {
            logger.error(error)
        }
    }

  

  private = async (req, res) => {
    try{
    res.status(200).json({ message: "Ruta privada" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
