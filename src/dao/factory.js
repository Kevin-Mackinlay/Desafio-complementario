const config = require("../config/objectConfig.js");

let UserServiceDb;
let ProductServiceDb;
let CartServiceDb;
let ChatServiceDb;
let TicketServiceDb;

switch (config.persistence) {
  case "MONGO":
    config.connectDB();

    const UserServiceMongo = require("../dao/db/users.service.db.js");
    const ProductServiceMongo = require("../dao/db/products.service.db.js");
    const CartServiceMongo = require("../dao/db/carts.service.db.js");
    const ChatServiceMongo = require("../dao/db/chat.service.db.js");
    const TicketServiceMongo = require("../dao/db/ticket.service.db.js");

    UserServiceDb = new UserServiceMongo();
    ProductServiceDb = new ProductServiceMongo();
    CartServiceDb = new CartServiceMongo();
    ChatServiceDb = new ChatServiceMongo();
    TicketServiceDb = new TicketServiceMongo();

    break;

  case "FS":
    const UserServiceFs = require("../dao/fs/user.service.fs.js");
    const ProductServiceFs = require("../dao/fs/product.service.fs.js");
    const CartServiceFs = require("../dao/fs/cart.service.fs.js");
    const ChatServiceFs = require("../dao/fs/chat.service.fs.js");
    const TicketServiceFs = require("../dao/fs/ticket.service.fs.js");

    UserServiceDb = new UserServiceFs();
    ProductServiceDb = new ProductServiceFs();
    CartServiceDb = new CartServiceFs();
    ChatServiceDb = new ChatServiceFs();
    TicketServiceDb = new TicketServiceFs();
    break;
}

module.exports = { UserServiceDb, ProductServiceDb, CartServiceDb, ChatServiceDb, TicketServiceDb };
