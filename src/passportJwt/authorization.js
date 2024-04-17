

const  authorization = (...roles) => {
  return async (req, res, next) => {
    console.log(roles);
    const userRole = req.user.role;
    try {
      if (!userRole) {
        req.logger.error(
          `Error de autenticación: Usuario no autorizado ${new Date().toLocaleString()}`
        );
        CustomError.createError({
          name: "Error de autenticación",
          cause: generateAuthErrorInfo(req.user, typeErrors.AUTH_ERROR),
          message: "Usuario no autorizado",
          code: typeErrors.AUTH_ERROR,
        });
        return res.status(401).json({
          error: "User not authorized",
        });
      }
      if (!roles.includes(userRole)) {
        req.logger.error(
          `Error de autenticación. Usuario sin permisos ${new Date().toLocaleString()}`
        );
        CustomError.createError({
          name: "Error de autenticación",
          cause: generateAuthErrorInfo(req.user, typeErrors.AUTH_ERROR),
          message: "Usuario sin permisos",
          code: typeErrors.AUTH_ERROR,
        });
        return res.status(403).send({
          error: "Usuario sin permisos",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default authorization;



// const authorization = (roles) => {
//   return async (req, res, next) => {
//     const getRole = roles.find((role) => role == req.user.role);
//     if (!req.user) return res.status(401).send({ status: "error", message: "Unauthorized" });
//     if (req.user.role !== getRole) {
//       return res.status(403).send({
//         status: "Error",
//         message: `You don't have permission because you are ${req.user.role}`,
//       });
//     }
//     next();
//   };
// };

// export default authorization;
