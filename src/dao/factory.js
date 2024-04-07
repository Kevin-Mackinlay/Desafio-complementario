import config from "../config/objectConfig.js";

export let UserServiceDb;
export let ProductServiceDb;
export let CartServiceDb;
export let TicketServiceDb;

switch (config.persistence) {
  case "MONGO":
    config.connectDB();

    const { default: UserServiceMongo } = await import("../dao/db/users.service.db.js");
    const { default: ProductServiceMongo } = await import("../dao/db/products.service.db.js");
    const { default: CartServiceMongo } = await import("../dao/db/carts.service.db.js");
    const { default: TicketServiceMongo } = await import("../dao/db/ticket.service.db.js");

    UserServiceDb = new UserServiceMongo();
    ProductServiceDb = new ProductServiceMongo();
    CartServiceDb = new CartServiceMongo();
    TicketServiceDb = new TicketServiceMongo();

    break;

  case "FS":
    const { default: UserServiceFs } = await import("../dao/fs/user.service.fs.js");
    const { default: ProductServiceFs } = await import("../dao/fs/product.service.fs.js");
    const { default: CartServiceFs } = await import("../dao/fs/cart.service.fs.js");
    const { default: TicketServiceFs } = await import("../dao/fs/ticket.service.fs.js");


    UserServiceDb = new UserServiceFs(); // Corrección: userServiceFs => userServiceDb
    ProductServiceDb = new ProductServiceFs(); // Corrección: productServiceFs => productServiceDb
    CartServiceDb = new CartServiceFs(); // Corrección: cartServiceFs => cartServiceDb
    TicketServiceDb = new TicketServiceFs(); // Corrección: ticketServiceFs => ticketServiceDb

    break;
}
