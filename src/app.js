import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import swaggerOptions from "./utils/swagger.js";
import errorHandler from "./middlewares/errorHandler/errorHandling.js";

import IndexRouter from "./routes/index.routes.js";
import dotenv from "dotenv";
import { __dirname } from "../src/utils/utils.js";
import { initializePassport } from "./config/passport.config.js";
import { addLogger, logger } from "./utils/logger.js";
import compression from "express-compression";
import cors from "cors";
import mockingRouter from "./routes/mocking.routes.js";
import cluster from "cluster";
import { cpus } from "os";

dotenv.config();

const app = express();
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/";
const PORT = process.env.PORT || 8080;
const COOCKIESECRET = process.env.CODERSECRET;
const numeroDeCPUs = cpus().length;
console.log(numeroDeCPUs);

const specs = swaggerJsdoc(swaggerOptions);
//config de app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));
app.use(cors());
// app.use(compression()); //gzip
app.use(compression({ brotli: { enabled: true, zlib: {} } }));

//configuración de handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.set("view engine", "handlebars");

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: DB_URL,
      mongoOptions: {},
      ttl: 600,
    }),
    secret: "COOCKIESECRET",
    resave: false,
    saveUninitialized: true,
  })
);

//passport
initializePassport();

app.use(passport.initialize());
app.use(passport.session());

app.use(addLogger);
//rutas
app.use("/", IndexRouter);
// app.use(error

// app.use("/api/mockingproducts", mockingRouter);
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

//middlewares para el manejo de datos
app.use(cookieParser(COOCKIESECRET));
app.use(errorHandler);
// app.use(logger);

// app.get("/", (req, res) => {
//   throw new Error("Algo falló!");
// });

app.get("/ejemploBrotli", (req, res) => {
  let ejemploString = "Hola soy un string de ejemplo";

  for (let i = 0; i < 1000; i++) {
    ejemploString += "y sigue siendo pesado";
  }
  res.send(ejemploString);
});

app.get("/operacionsencilla", (req, res) => {
  let suma = 0;
  for (let i = 0; i < 1000000; i++) {
    suma += i;
  }
  res.json({ suma });
});

app.get("/operacioncompleja", (req, res) => {
  let suma = 0;
  for (let i = 0; i < 5e8; i++) {
    suma += i;
  }
  res.json({ suma });
});

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

server.on("error", (error) => console.log(error));

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Se conecto un nuevo ususario");
});

export { server, app };

startMongoConnection()
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => console.log(err));

async function startMongoConnection() {
  await mongoose.connect(DB_URL);
}

