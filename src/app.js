import express from "express";
//import { ProductManager } from "./classes/ProductManager.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import { _dirname } from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.route.js";

const app = express();
const PORT = 4000;

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
}); //levanto el servidor http con socket io  incorporado en el mismo servidor        

const socketServer = new Server(httpServer); //creo el servidor de socket io  y le paso el servidor http  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(_dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", _dirname + "/views");
app.set("view engine", "handlebars");


let products = [];
//const productManager = new ProductManager("./products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("hola mundo");
// });


app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewsRouter);



app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
