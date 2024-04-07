import passport from "passport";
import jwt from "passport-jwt";
import dotenv from "dotenv"; // Import dotenv for loading environment variables

// Load environment variables from .env file
dotenv.config();

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

// Define a function to extract JWT token from cookie
const cookieExtract = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["CoderCookieToken"];
  }
  return token;
};

// Initialize Passport with JWT strategy using environment variable for secret key
const initPassport = () => {
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtract]),
        secretOrKey: process.env.JWT_PRIVATE_KEY, // Use environment variable for secret key
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

// Export the Passport initialization function
export default initPassport;
