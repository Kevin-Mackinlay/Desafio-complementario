import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { userService } from "../services/services.js";
import { creaHash, validPassword } from "../utils/bcryptHash.js";

const initializePassport = () => {
  passport.use(
    "signup",
    new LocalStrategy({ usernameField: "email", session: false, passReqToCallback: true }, async (req, email, password, done) => {
      try {
        const { firstName, lastName } = req.body;
        if (!firstName || !lastName || !email || !password) {
          req.signupSuccess = false;
          return done(null, false, { message: "Missing fields" });
        }

        const exists = await userService.getUser({ email });

        if (exists) {
          req.signupSuccess = false;
          return done(null, false, { message: "User already exists" });
        }

        const hashedPassword = creaHash(password);

        const newUser = await userService.createUser({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });

        // if (!newUser) {
        // 	req.signupSuccess = false;
        // 	return done(null, false, { message: "Error creating user" });
        // }

        req.signupSuccess = true;
        return done(null, newUser, { message: "User created" });
      } catch (error) {
        req.signupSuccess = false;
        return done(error, false, { message: "Error creating user" });
      }
    })
  );

  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email", session: false }, async (email, password, done) => {
      try {
        const user = await userService.getUser({ email });
        if (!user) {
          console.log(1);
          return done(null, false, { message: "User not found" });
        }

        const passwordValidation = validPassword(password, user.password);
        if (!passwordValidation) {
          console.log(2);
          return done(null, false, { message: "Password incorrect" });
        }

        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    })
  );

  // const cookieExtractor = (req) => {
  //   let token = null;
  //   if (req && req.cookies) {
  //     token = req.cookies["config.jw"];
  //   }
  //   return token;
  // };
};

export default initializePassport;
 