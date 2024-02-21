import { Router } from "express";
import ProductsService from "../services/db/Products.service.db.js";
import ChatService from "../services/db/Chat.service.db.js";
import CartsManager from "../services/db/Carts.service.db.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const viewsRouter = Router();
const productsService = new ProductsService("src/products.json");
const chatService = new ChatService();
const cartsManager = new CartsManager();

viewsRouter.get("/cart/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsManager.getCartById(cid);
    console.log(cart.products);
    res.render("carts", {
      products: cart.products,
      style: "/css/cart.css",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

viewsRouter.get("/products", async (req, res) => {
  try {
    const { limit = 8, page = 1, sort, category } = req.query;
    const filter = {
      options: {
        limit,
        page,
      },
    };

    if (category) {
      filter.query = { category: category };
    }

    if (sort) {
      filter.options.sort = { price: sort };
    }
    //console.log(filter);
    const pagesData = await productsService.getPaginatedProducts(filter);

    pagesData.products = pagesData.docs; // Cambio nombre de propiedad para ser más explícito
    delete pagesData.docs; // Elimino propiedad que ya no uso

    const baseUrl = `http://localhost:8080/products?limit=${limit}`;
    // Creo links para las páginas anterior de manera dinámica
    pagesData.prevLink = pagesData.hasPrevPage && `${baseUrl}&page=${pagesData.prevPage}${sort ? "&sort=" + sort : ""}${category ? "&category=" + category : ""}`;

    pagesData.nextLink = pagesData.hasNextPage && `${baseUrl}&page=${pagesData.nextPage}${sort ? "&sort=" + sort : ""}${category ? "&category=" + category : ""}`;

    if (pagesData.products.length < 1) {
      res.status(404).json({
        success: false,
        message: "Could not retrieve products",
      });
      return;
    }

    res.render("products", {
      title: "Listado de productos",
      data: pagesData,
      user: req.session.user,
      style: "css/products.css",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

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

viewsRouter.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("realtime", {
      title: "Productos en tiempo real",
      products: products,
      style: "/css/products.css",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

viewsRouter.get("/chat", async (req, res) => {
  try {
    const messages = await chatService.findMessages();

    res.render("chat", {
      title: "Chat",
      messages: messages,
      style: "/css/chat.css",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

viewsRouter.get("/", (req, res) => {
  res.render("home");
});
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

viewsRouter.get("/logout", async (req, res) => {
  res.render("logout", {
    title: "Logout",
    user: req.user,
  });
});

export default viewsRouter;
