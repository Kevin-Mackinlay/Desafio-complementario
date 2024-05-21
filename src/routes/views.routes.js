import { Router } from "express";
// import passportCall from "../passportJwt/passportCall.js";
import ViewsController from "../controllers/views.controller.js";
import { productService, ticketService, userService, cartService} from "../services/services.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

// const passportCall = passportCallModule.passportCall;
// const passportCallUrl = passportCallModule.passportCallUrl;

console.log("ProductService:", productService);
console.log("TicketService:", ticketService);
console.log("UserService :", userService);
console.log("CartService :", cartService);


const viewsController = new ViewsController( productService, ticketService, userService, cartService);

const viewsRouter = Router();

viewsRouter.get("/products", viewsController.renderProducts);
viewsRouter.get("/realtimeproducts", viewsController.renderRealTime);
viewsRouter.get("/chat", viewsController.renderChat);
viewsRouter.get("/", viewsController.renderHome);
viewsRouter.get("/login", viewsController.renderLogin);
viewsRouter.get("/signup", viewsController.renderSignup);
viewsRouter.get("/logout", viewsController.renderLogout);
viewsRouter.get("/tickets", viewsController.renderTickets);
viewsRouter.get("/recoverPassword", viewsController.recoverPassword);
viewsRouter.get("/newPassword", viewsController.newPassword);
viewsRouter.get("/cart/:uid", viewsController.renderCartView);
viewsRouter.get("/carts/:cid/purchase", viewsController.purchaseView);
viewsRouter.get('/uploadDocuments', isAuthenticated, viewsController.upLoadDocument )
viewsRouter.get('/purchase', isAuthenticated, viewsController.purchaseView)

export default viewsRouter;
