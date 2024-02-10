import passport from "passport";
import GithubStrategy from "passport-github2";
import userservice from "../dao/models/user.model.js";
import dotenv from "dotenv";

dotenv.config();
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

const initializePassport = () => {
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userservice.findOne({ email: profile?.emails[0]?.value });
          if (!user) {
            const newUser = {
              first_name: profile.displayName.split(" ")[0],
              last_name: profile.displayName.split(" ")[1],
              email: profile.emails[0].value,
              age: 40,
              password: crypto.randomBytes(20).toString("hex"),
            };
            let result = await userservice.create(newUser);
            return done(null, result);
          } else {
            return done(null, user);
          }
        } catch (error) {
        return   done("error al onbtener el usuario");
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    const user = userservice.findById(id);
    done(null, user);
  });
};

export default initializePassport;
