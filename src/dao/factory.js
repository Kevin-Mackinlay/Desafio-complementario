const config = require("../config/objectConfig.js");

let UserServiceDb;
let ProductServiceDb;
let CartServiceDb;
let TicketServiceDb;

switch (config.persistence) {
  case "MONGO":
    config.connectDB();

    const UserServiceMongo = require("../dao/db/users.service.db.js");
    const ProductServiceMongo = require("../dao/db/products.service.db.js");
    const CartServiceMongo = require("../dao/db/carts.service.db.js");
    const TicketServiceMongo = require("../dao/db/ticket.service.db.js");

    UserServiceDb = new UserServiceMongo();
    ProductServiceDb = new ProductServiceMongo();
    CartServiceDb = new CartServiceMongo();
    TicketServiceDb = new TicketServiceMongo();

    break;

  case "FS":
    const UserServiceFs = require("../dao/fs/user.service.fs.js");
    const ProductServiceFs = require("../dao/fs/product.service.fs.js");
    const CartServiceFs = require("../dao/fs/cart.service.fs.js");
    const TicketServiceFs = require("../dao/fs/ticket.service.fs.js");

    UserServiceDb = new UserServiceFs(); // Corrección: userServiceFs => userServiceDb
    ProductServiceDb = new ProductServiceFs(); // Corrección: productServiceFs => productServiceDb
    CartServiceDb = new CartServiceFs(); // Corrección: cartServiceFs => cartServiceDb
    TicketServiceDb = new TicketServiceFs(); // Corrección: ticketServiceFs => ticketServiceDb

    break;
}

export default { UserServiceDb, ProductServiceDb, CartServiceDb, TicketServiceDb };
