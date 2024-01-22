import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import productsRoutes from "./routes/products.routes.js";
import cartsRoutes from "./routes/carts.routes.js";
import handlebars from "express-handlebars";
import viewsRoutes from "./routes/views.routes.js";
import { __dirname } from "./utils.js";
// import { ProductManager } from "./classes/ProductManager.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/";

// const Message = mongoose.model("Message", {
//   user: String,
//   message: String,
// });

// const productManager = new ProductManager("productos.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));
// app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.set("view engine", "handlebars");

// app.use("/api/products", productRouter);
// app.use("/api/cart", cartRouter);
// app.use("/", viewsRouter);

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
