import config from "../config/config.js";
import repositories from "../dao/repositories/index.js";

const services = {};

switch (config.persistence) {
  case "MONGO":
    
    const { default: CartServiceDb } = await import("./db/carts.service.db.js");
    const { default: ProductServiceDb } = await import("./db/products.service.db.js");
    const { default: UserServiceDb } = await import("./db/users.service.db.js");
    const { default: ChatServiceDb } = await import("./db/chat.service.db.js");

    services.cartsService = new CartServiceDb(repositories.Carts);
    services.productService= new ProductServiceDb(repositories.Products);
    services.userService= new UserServiceDb(repositories.Users);
    services.chatService = new ChatServiceDb(repositories.Chats);
    break;
  case "FS":
    const { default: CartServiceFs } = await import("../services/db/Carts.service.fs.js");
    const { default: ProductServiceFs } = await import("../services/db/Products.service.fs.js");
    const { default: UserServiceFs } = await import("../services/db/Users.service.fs.js");
    const { default: ChatServiceFs } = await import("../services/db/Chats.service.fs.js");

    services.cartsService = new CartServiceFs("./fs/data/carts.json");
    services.productService = new ProductServiceFs("./fs/data/products.json");
    services.userService = new UserServiceFs("./fs/data/users.json");
    services.chatService = new ChatServiceFs("./fs/data/messages.json");

    break;
}

export default services;