import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import IndexRouter from "./routes/index.routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/";

app.use(cookieParser());

// esto es para que se guarde la sesion en la base de datos session-file-store
// const fileStorage = FileStore(session);
// app.use(
//   session({
//     store: new fileStorage({
//       path: "./sessions",
//       ttl: 100,
//       retries: 0,
//     }),
//     secret: "codersecret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );


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



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.set("view engine", "handlebars");

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/", IndexRouter);

const server = app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Se conecto un nuevo ususario");
});

startMongoConnection()
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => console.log(err));

async function startMongoConnection() {
  await mongoose.connect(DB_URL);
}

//
