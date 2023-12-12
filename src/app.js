import express from "express";
//import { ProductManager } from "./classes/ProductManager.js";
import productRouter from "./routes/products.router.js";

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



app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
