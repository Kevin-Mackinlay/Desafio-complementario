import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import dotenv from "dotenv"; // Import dotenv for loading environment variables
import { userService } from "../services/services.js";
import { creaHash, validPassword } from "../utils/bcryptHash.js";

// Load environment variables from .env file
dotenv.config();

const initializePassport = () => {
  passport.use(
    "signup",
    new LocalStrategy({ usernameField: "email", session: false, passReqToCallback: true }, async (req, email, password, done) => {
      try {
        const { firstName, lastName } = req.body;
        if (!firstName || !lastName || !email || !password) {
          return done(null, false, { message: "Missing fields" });
        }
        console.log(user);
        const exists = await userService.getUser({ email });
        if (exists) {
          return done(null, false, { message: "User already exists" });
        }
        const hashedPassword = creaHash(password);
        const newUser = await userService.createUser({ firstName, lastName, email, password: hashedPassword });
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email", session: false }, async (email, password, done) => {
      try {
        const user = await userService.getUser({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        const passwordValidation = await validPassword(password, user.password);
        if (!passwordValidation) {
          return done(null, false, { message: "Password incorrect" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );



  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies["jwt"];
    }
    return token;
  };
}

export default initializePassport;
