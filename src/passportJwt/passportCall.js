import passport from "passport";



 const passportCall = (strategy) => {
   return async (req, res, next) => {
     passport.authenticate(strategy, function (error, user, info) {
       if (error) {
         req.logger.error(`Authentication error. User not authorized ${new Date().toLocaleString()}`);
         CustomError.createError({
           name: "Authentication error",
           cause: generateAuthErrorInfo(error, typeErrors.AUTH_ERROR),
           message: "User not authorized",
           code: typeErrors.AUTH_ERROR,
         });
         return next(error);
       }
       if (!user) {
         req.logger.error(`Authentication error. User not authorized ${new Date().toLocaleString()}`);
         CustomError.createError({
           name: "Authentication error",
           cause: generateAuthErrorInfo(info, typeErrors.AUTH_ERROR),
           message: "User not authorized",
           code: typeErrors.AUTH_ERROR,
         });
         return res.status(401).json({
           error: info.messages ? info.messages : info.toString(),
         });
       } else {
         req.user = user;
       }
       next();
     })(req, res, next);
   };
 };



    export const passportCallUrl = (strategy) => {
        return async (req, res, next) => {
          passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) return res.redirect("/login/recover-password");
            req.user = user;
            next();
          })(req, res, next);
        }
          
    }

export default {passportCall, passportCallUrl}




// export const passportCall = (strategy) => {
//     return async (req, res, next ) => {
//         passport.authenticate(strategy, function(err, user, info) {
//             if(err) return next(err);
//             if(!user) return res.status(401).send({status:"error", error: info.message? info.message : info.toString()})
//             req.user = user
//             next()
              
//             })(req, res, next)
//         }
//     }
