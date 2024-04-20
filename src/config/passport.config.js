import passport from "passport";
import GitHubStrategy from "passport-github2";
import userService from "../services/services.js";


/**
 * Serializa y deserializa usuarios.
 */
passport.serializeUser((user, done) => {
  done(null, user[0].email);
});

passport.deserializeUser(async (id, done) => {
  const user = await userService.getOneUser(id);
  done(null, user);
});

/**
 * Configura passport para loguear usuarios con GitHub.
 */
const initializeGithubStrategy = () => {
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
};

export {
  initializeGithubStrategy,
};