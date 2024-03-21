import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import ViewsController from "../controllers/views.controller.js";
import services from "../services/factory.js";
const viewsController = new ViewsController(services.chatService, service.productsService);
const viewsRouter = Router();

viewsRouter.get("/cart/:cid", viewsController.getCartById);
viewsRouter.get("/products", viewsController.getProducts);
viewsRouter.get("/realtimeproducts", viewsController.getRealTimeProducts);
viewsRouter.get("/chat", viewsController.getChat);
viewsRouter.get("/", viewsController.getHome);
viewsRouter.get("/login", isAuthenticated, viewsController.getLogin);
viewsRouter.get("/signup", isAuthenticated, viewsController.getSignup);
viewsRouter.get("/logout", viewsController.getLogout);

export default viewsRouter;

