const config = require("../config/objectConfig.js");
// import repositories from "../dao/repositories/index.js";

const services = {};

switch (config.persistence) {
  case "MONGO":
    const { default: CartServiceDb } = await import("./db/carts.service.db.js");
    const { default: ProductServiceDb } = await import("./db/products.service.db.js");
    const { default: UserServiceDb } = await import("./db/users.service.db.js");
    const { default: ChatServiceDb } = await import("./db/chat.service.db.js");
    const { default: TicketServiceDb } = await import("./db/ticket.service.db.js");

    services.cartService = new CartServiceDb(repositories.carts);
    services.productService = new ProductServiceDb(repositories.products);
    services.userService = new UserServiceDb(repositories.users);
    services.chatService = new ChatServiceDb(repositories.chat);
    services.ticketService = new TicketServiceDb(repositories.tickets);

    break;
  case "FS":
    const { default: CartServiceFs } = await import("./db/cart.service.fs.js");
    const { default: ProductServiceFs } = await import("./db/product.service.fs.js");
    const { default: UserServiceFs } = await import("./db/user.service.fs.js");
    const { default: ChatServiceFs } = await import("./db/chat.service.fs.js");
    const { default: TicketServiceFs } = await import("./db/ticket.service.fs.js");

    services.cartsService = new CartServiceFs("../../src/carts.json");
    services.productService = new ProductServiceFs("../../src/products.json");
    services.userService = new UserServiceFs("../../src/users.json");
    services.chatService = new ChatServiceFs("../../src/messages.json");
    services.ticketService = new TicketServiceFs("../../src//tickets.json");

    break;
}

export default services;
