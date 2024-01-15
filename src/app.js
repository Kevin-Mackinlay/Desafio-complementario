import express from "express";
import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import { ProductManager } from "./classes/ProductManager.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const DB_URL =process.env.DB_URL || "mongodb://localhost:27017/ecommerce";

const productManager = new ProductManager("productos.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("src/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewsRouter);

const server = app.listen(PORT, () => {
  console.log("servidor esta running en el puerto" + PORT);
});

mongoose.connect(DB_URL)
  .then(() => {
    console.log("base de datos conectada" + DB_URL);
  })
  .catch((err) => {
    console.log("error al conectar a la base de datos", err);
  });

const socketServer = new Server(server);

socketServer.on("connection", (socket) => {
  console.log("nuevo cliente conectado");
  socket.on("addProduct", async (product) => {
    const title = product.title;
    const description = product.description;
    const price = product.price;
    const thumbnail = product.thumbnail;
    const code = product.code;
    const stock = product.stock;
    try {
      const result = await productManager.addProduct(title, description, price, thumbnail, code, stock);
      const allProducts = await productManager.getProducts();
      console.log(allProducts);
      result && socketServer.emit("updateProducts", allProducts);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("deleteProduct", async (id) => {
    console.log(id);
    try {
      const result = await productManager.deleteProductById(id);
      const allProducts = await productManager.getProducts();
      console.log(allProducts);
      result && socketServer.emit("updateProducts", allProducts);
    } catch (err) {
      console.log(err);
    }
  });
});
