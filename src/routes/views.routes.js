import { Router } from "express";

import ProductsManager from "../services/db/Products.service.db.js";
import ChatService from "../services/db/Chat.service.db.js";
import CartsManager from "../services/db/Carts.service.db.js";

const viewsRouter = Router();
const productManager = new ProductsManager();
const chatService = new ChatService();
const cartsManager = new CartsManager();

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/login", (req, res) => {
  res.render("login");
});

viewsRouter.get("/cart/:cid", async (req, res) => {
  try{
  const { cid } = req.params;
  const cart = await cartsManager.getCartById(cid);
  console.log(cart.products);
  res.render("carts", {
    products: cart.products,
    style: "/css/cart.css",
  }); 
} catch (error) {
  res.status(500).json({ error: error.message });
}});

viewsRouter.get("/products", async (req, res) => {
  try{
  const products = await productManager.getProducts();
  res.render("products", {
    title: "Listado de productos",
    products: products,
    style: "/css/products.css",
  });
} catch (error) { 
  res.status(500).json({ error: error.message });
}});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  try{
  const products = await productManager.getProducts();
  res.render("realtime", {
    title: "Productos en tiempo real",
    products: products,
    style: "/css/products.css",
  });
} catch (error) {
  res.status(500).json({ error: error.message });
}});

viewsRouter.get("/chat", async (req, res) => {
  try{
  const messages = await chatService.findMessages();

  res.render("chat", {
    title: "Chat",
    messages: messages,
    style: "/css/chat.css",
  });
} catch (error) {
  res.status(500).json({ error: error.message });
}});
export default viewsRouter;
