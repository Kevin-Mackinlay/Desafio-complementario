import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { get } from "mongoose";
import { getCartById, getChat, getHome, getLogout, getProducts, getRealTimeProducts } from "../controllers/views.controller.js";

const viewsRouter = Router();
// const productsService = new ProductsService("src/products.json");
// const chatService = new ChatService();
// const cartsManager = new CartsManager();

viewsRouter.get("/cart/:cid", getCartById);

viewsRouter.get("/products", getProducts);

viewsRouter.get("/realtimeproducts", getRealTimeProducts);

viewsRouter.get("/chat", getChat);

viewsRouter.get("/", getHome);

viewsRouter.get("/login", isAuthenticated, async (req, res) => {
  res.render("login", {
    title: "Login",
  });
});
viewsRouter.get("/signup", isAuthenticated, async (req, res) => {
  res.render("signup", {
    title: "Signup",
  });
});

viewsRouter.get("/logout", getLogout);

export default viewsRouter;


// viewsRouter.get("/products", async (req, res) => {
//   try{
//   const products = await productsService.getProducts();
//   res.render("products", {
//     title: "Listado de productos",
//     products: products,
//     style: "/css/products.css",
//   });
// } catch (error) {
//   res.status(500).json({ error: error.message });
// }});

// viewsRouter.get("/logout", async (req, res) => {

//   res.redirect("/logout", {
//     title: "Logout",
//     });
// });
