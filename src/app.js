import express from "express";
//import { ProductManager } from "./classes/ProductManager.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

const app = express();
const PORT = 8080;
let products = [];
//const productManager = new ProductManager("./products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hola mundo");
});


app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);



app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
