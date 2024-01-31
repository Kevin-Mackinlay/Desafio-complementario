import { Router } from "express";
import ProductsManager from "../services/db/Products.service.db.js";
import ChatService from "../services/db/Chat.service.db.js";
import CartsManager from "../services/db/Carts.service.db.js";

const viewsRouter = Router();
const productManager = new ProductsManager();
const chatService = new ChatService();
const cartsManager = new CartsManager();

viewsRouter.get("/cart/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsManager.getCartById(cid);
  console.log(cart.products);
  res.render("carts", {
    products: cart.products,
    style: "/css/cart.css",
  }); 
});

viewsRouter.get("/products", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("products", {
    title: "Listado de productos",
    products: products,
    style: "/css/products.css",
  });
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realtime", {
    title: "Productos en tiempo real",
    products: products,
    style: "/css/products.css",
  });
});

viewsRouter.get("/chat", async (req, res) => {
  const messages = await chatService.findMessages();

  res.render("chat", {
    title: "Chat",
    messages: messages,
    style: "/css/chat.css",
  });
});
export default viewsRouter;
