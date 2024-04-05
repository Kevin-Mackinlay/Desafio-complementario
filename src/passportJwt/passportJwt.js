import passport from "passport";
import jwt from "passport-jwt";
const objectConfig = require("../config/objectConfig.js");

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const cookieExtract = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["CoderCookieToken"];
  }
  return token;
};

const initPassport = () => {
  passporty.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtract]),
        secretOrKey: objectConfig.JwtKeySecret,
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

passport.use(
  "urlJwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtract]),
      secretOrKey: objectConfig.JwtKeySecret,
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

export default initPassport;
