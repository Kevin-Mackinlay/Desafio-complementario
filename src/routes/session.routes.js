// import bcrypt from "bcrypt";
import { Router } from "express";
import passport from "passport";
// import UserModel from "../dao/models/user.model.js";
import  isAuthenticated  from "../middlewares/isAuthenticated.js";
// import UserService from "../services/db/User.service.db.js";


const sessionRouter = Router();
// const userService = new UserService();


sessionRouter.post("/login", passport.authenticate("login", { failureRedirect:"/login"}), async (req, res) => {
  res.status(200).json({ success:true, message: "user logged in", redirectUrl: "/products" });

}); 

sessionRouter.post("/signup", passport.authenticate("signup", { failureRedirect:"/signup"}), async (req, res) => {
  res.status(201).json({ success:true, message: "user created", redirectUrl: "/login" });
});


















// router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => {});

// router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
//   req.session.user = req.user;
//   req.session.admin = true;
//   res.redirect("/");
// });

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userService.getUserByEmail(email);

//     if (!user) {
//       res.status(404).json({
//         success: false,
//         message: "user not found",
//       });
//     }
//     const passwordsMatches = await bcrypt.compare(password, user.password);
//     if (!passwordsMatches) {
//       res.status(401).json({
//         success: false,
//         message: "password incorrect",
//       });
//     }
    
//     delete user.password;
    

//     req.session.user = user
//     res.status(200).json({
//       success: true,
//       message: "user logged in",
//       redirectUrl: "/products",
//     });
//   } catch (error) {
    
//     res.status(500).json({
    
//       success: false,
//       message: "internal server error",
      
//     });
//   }
// });


// router.post("/signup", async (req, res) => {
//   try {
//     const { first_name, last_name, email, password, age } = req.body;

//     const user = await userService.getUserByEmail(email);

//     if (user) {
//       res.status(400).json({
//         success: false,
//         message: "user already exists",
//       });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await userService.createUser({
//       email,
//       password: hashedPassword,
//       first_name,
//       last_name,
//       age,
//     });

//     if (!newUser) {
//       return res.status(500).json({
//         success: false,
//         message: "internal server error",
//       });
//     }
//     res.status(201).json({
//       success: true,
//       message: "user created",
//       redirectUrl: "/login",
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ success: false, message: "internal server error" });
//   }




  
// });

sessionRouter.get("/privado", isAuthenticated, (req, res) => {
  res.render("topsecret", {
    title: "Privado",
    user: req.session.user,
  });
}
);


sessionRouter.post("/logout", async (req, res) => {
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

});

export default sessionRouter;
