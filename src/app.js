import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
// import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import IndexRouter from "./routes/index.routes.js";
import dotenv from "dotenv";
import { __dirname } from "../src/utils.js";
import loginRouter from "./routes/login.routes.js";
import signupRouter from "./routes/signup.routes.js";
import sessionRouter from "./routes/session.routes.js";

dotenv.config();
const app = express();
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/";
const PORT = process.env.PORT || 8080;
const COOCKIESECRET = process.env.CODERSECRET;

//middlewares para el manejo de datos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(COOCKIESECRET));

app.use(express.static("src/public"));

app.use("/", IndexRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.set("view engine", "handlebars");

//routes


app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: DB_URL,
      mongoOptions: {
        useNewUrlParser: true,
      },
      ttl: 600,
    }),
    secret: "COOCKIESECRET",
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/", sessionRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);


const environment = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(error);
  }
};

environment();

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

server.on("error", (error) => console.log(error));

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Se conecto un nuevo ususario");
});

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: DB_URL,
      ttl: 15,
      mongoOptions: {
        useNewUrlParser: true,
      },
    }),
    secret: "codersecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Counter: ${req.session.counter}`);
  } else {
    req.session.counter = 1;
    res.send("Bienvenido");
  }
});

startMongoConnection()
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => console.log(err));

async function startMongoConnection() {
  await mongoose.connect(DB_URL);
}

// const server = app.listen(PORT, (error) => {
//   if (error) {
//     console.log(error);
//   }
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });

//
