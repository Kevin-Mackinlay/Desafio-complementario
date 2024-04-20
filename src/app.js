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
import  swaggerOptions  from "./utils/swagger.js";

import IndexRouter from "./routes/index.routes.js";
import dotenv from "dotenv";
import { __dirname } from "../src/utils/utils.js";
import initPassport from "./passportJwt/passportJwt.js";
import { addLogger , logger} from "./utils/logger.js";
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

//middlewares para el manejo de datos
app.use(cookieParser(COOCKIESECRET));
app.use(addLogger);
// app.use(logger);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: DB_URL,
      mongoOptions: {
      
      },
      ttl: 600,
    }),
    secret: "COOCKIESECRET",
    resave: false,
    saveUninitialized: true,
  })
);

//passport
initPassport();


app.use(passport.initialize());
app.use(passport.session());

//rutas
app.use("/", IndexRouter);
// app.use(errorHandler);

app.use("/api/mockingproducts", mockingRouter);
 app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// if (cluster.isPrimary) {
// console.log(
//   `Primary ${process.pid} is running`
// );
// cluster.fork();
// cluster.fork();
// } else {
//   console.log(`proceso hijo ${process.pid} corriendo`);
// }

// console.log(process.env.EMAIL, process.env.APP_PASSWORD);
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   port: 587,
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.APP_PASSWORD,
//   },
// });

// app.get("/mail", async (req, res) => {
//   try {
//     let result = await transporter.sendMail({
//       from: `Cliente de prueba <${process.env.EMAIL}>`,
//       to: "dianaaranda1588@gmail.com",
//       subject: "Prueba de envio de mail",
//       text: "Este es un mail de prueba",
//       html: "<h1 style=' color: red' >Hola soy yo, te estoy enviando un mail desde la aplicacion que estoy construyendo/h1>",
//     });
//     res.json({ status: "success", result });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ status: "error", error: error.message });
//   }
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

// app.get("*", (req, res) => {
//   CustomError.createError({
//     name: " Estas perdido",
//     cause: req.body,
//     message: "No encontramos la página que buscas",
//     code: typeErrors.ROUTING_ERROR,
//   });
// });

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

server.on("error", (error) => console.log(error));

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Se conecto un nuevo ususario");
});

// app.get("/", (req, res) => {
//   if (req.session.counter) {
//     req.session.counter++;
//     res.send(`Counter: ${req.session.counter}`);
//   } else {
//     req.session.counter = 1;
//     res.send("Bienvenido");
//   }
// });

// app.get("/", (req, res) => {
//   req.logger.warn("!Alerta!");
//   res.send({ message: "Prueba de logger" });
// });

// app.get("/", (req, res) => {
//   res.send({ message: "errorHandler" });
// });

startMongoConnection()
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => console.log(err));

async function startMongoConnection() {
  await mongoose.connect(DB_URL);
}
