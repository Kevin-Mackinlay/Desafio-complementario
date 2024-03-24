import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import ViewsController from "../controllers/views.controller.js";
import services from "../services/factory.js";
const viewsController = new ViewsController(services.chatService, services.productService);
const viewsRouter = Router();


viewsRouter.get("/products", viewsController.renderProducts);
viewsRouter.get("/realtimeproducts", viewsController.renderRealTime);
viewsRouter.get("/chat", viewsController.renderChat);
viewsRouter.get("/", viewsController.renderHome);
viewsRouter.get("/login", isAuthenticated, viewsController.renderLogin);
viewsRouter.get("/signup", isAuthenticated, viewsController.renderSignup);
viewsRouter.get("/logout", viewsController.renderLogout);

export default viewsRouter;
