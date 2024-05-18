import express from "express";
import ProductsRouter from "./products.routes.js";
import CartsRouter from "./carts.routes.js";
import ViewsRouter from "./views.routes.js";
import ChatRouter from "./chat.routes.js";
import SessionsRouter from "../routes/session.routes.js";
import TicketRouter from "../routes/ticket.routes.js";
import mockingRouter from "../routes/mocking.routes.js";
import usersRouter from "../routes/users.routes.js";

const IndexRouter = express.Router();

IndexRouter.use("/api/products", ProductsRouter);
IndexRouter.use("/api/carts", CartsRouter);
IndexRouter.use("/api/chat", ChatRouter);
IndexRouter.use("/", ViewsRouter);
IndexRouter.use("/login", ViewsRouter);
IndexRouter.use("/signup", ViewsRouter);
IndexRouter.use("/api/sessions", SessionsRouter);
IndexRouter.use("/api/tickets", TicketRouter);
IndexRouter.use("/api/mockingproducts", mockingRouter);
IndexRouter.use("/api/mockingusers", mockingRouter);
IndexRouter.use("/api/users", usersRouter);
IndexRouter.use("/api/recoverPassword", ViewsRouter);
IndexRouter.use("/api/newPassword", ViewsRouter);




export default IndexRouter;