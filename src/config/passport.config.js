import passport from "passport";
import passportLocal from "passport-local";
import GitHubStrategy from "passport-github2";
import userService from "../dao/models/user.model.js";
import * as dotenv from "dotenv";
import User from "../dao/models/user.model.js";

dotenv.config();
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;


passport.use(
  "login",
   new passportLocal.Strategy({
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    },
  })
);




const initializePassport = () => {
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
          let user = await userService.findOne({
            email: profile?.emails[0]?.value,
          });
          if (!user) {
            const newUser = {
              first_name: names[0],
              last_name: names[1],
              email: profile.emails? profile.email[0]?.value: `${names[0]}${names[1]}@generic.com`,
              age: 20,
              password: Math.random().toString(36).substring(7),
            };
            let result = await userService.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (err) {
          done(err, null);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userService.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};

export default initializePassport;
