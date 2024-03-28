export default class SessionsController {

  signup = async (req, res) => {
    try{
      const {firstName, lastName, userName, email, birthDate, password} = req.body;
      if(!firstName || !lastName || !userName || !email || !birthDate || !password){
        res.status(400).json({message: "Faltan datos obligatorios"});
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

  getCurrentSession = async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(401).json({ message: "No hay una sesión activa" });
    } else {
      const session = {
        message: "Sesión activa",
        user: req.user,
      };
      res.status(200).json(session);
    }
  };

  private = async (req, res) => {
    try{
    res.status(200).json({ message: "Ruta privada" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
