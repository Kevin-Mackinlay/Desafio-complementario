import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import  FileStore  from "session-file-store";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import IndexRouter from "./routes/index.routes.js";

const fileStorage = FileStore(session);

const app = express();
const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/";

app.use(cookieParser());

app.use(
  session({
    store: new fileStorage({
      path: "./sessions",
      ttl: 100,
      retries: 0,
    }),
    secret: "codersecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.render("Hello World");    
});

// app.listen("8080", () => console.log(object));


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