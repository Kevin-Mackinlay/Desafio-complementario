import passport from "passport";
import GitHubStrategy from "passport-github2";
import LocalStrategy from "passport-local";
import { userService } from "../services/services.js";
import { creaHash, validPassword } from "../utils/bcryptHash.js";
import dotenv from "dotenv";

dotenv.config();

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
        console.log(userService);
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

        req.signupSuccess = true;
        return done(null, newUser, { message: "User created" });
      } catch (error) {
        console.log(error);
        req.signupSuccess = false;
        return done(error, false, { message: "Error creating user" });
      }
    })
  );

  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email", session: false }, async (email, password, done) => {
      try {
        console.log(email, password);
        const user = await userService.getUser({ email });
        if (!user) {
          console.log(1);
          return done(null, false, { message: "User not found" });
        }

        const passwordValidation = validPassword(password, user.password);
        if (!passwordValidation) {
          console.log("no encuentra");
          return done(null, false, { message: "Password incorrect" });
        }

        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    })
  );

  console.log("GITHUB_CLIENT_ID:", process.env.GITHUB_CLIENT_ID);
  console.log("GITHUB_CLIENT_SECRET:", process.env.GITHUB_CLIENT_SECRET);



  passport.use(
    "github",

    new GitHubStrategy(
      {
        session: false,
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await usersService.getOneUser(profile?.emails[0]?.value);
          if (user) {
            return done(null, user);
          } else {
            const newUser = {
              first_name: profile.displayName.split(" ")[0],
              last_name: profile.displayName.split(" ")[1],
              email: profile?.emails[0]?.value,
              password: "123",
            };
            const userNew = await usersService.signupUser(newUser);
            return done(null, userNew);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user[0].email);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userService.getOneUser(id);
    done(null, user);
  });
};

export { initializePassport };
