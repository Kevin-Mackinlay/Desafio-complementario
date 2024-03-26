import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "http" }),
    new winston.transports.File({filename:'./errors.log', level:'warn'})


    ],
});


export const addLoggers = (req, res, next) => {
  const textDate = new Date().toISOString();
  req.logger = logger;
  req.logger.http(`${req.method} en ${req.url} - ${textDate}`);
  next();
};


export default logger;