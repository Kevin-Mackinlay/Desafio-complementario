import config from "../config/config.js";
import mongoose from "mongoose";
import ProductMongo from "./repository/product.mongo.js";
import UserMongo from "./repository/user.mongo.js";
import ChatMongo from "./repository/chat.mongo.js";
import CartMongo from "./repository/cart.mongo.js";
import ProductMem from "./repository/product.memory.js";
import UserMem from "./repository/user.memory.js";
import ChatMem from "./repository/chat.memory.js";
import CartMem from "./repository/cart.memory.js";
import ProductRepository from "./repository/product.mongo.js";
import UserRepository from "./repository/user.mongo.js";
import ChatRepository from "./repository/chat.mongo.js";
import CartRepository from "./repository/cart.mongo.js";

export let Carts;
export let Products;
export let Users;
export let Chats;

switch (config.persistence) {
  case "MONGO":
    const connection = await mongoose.connect(config.DB_URL);
    const { default: CartService } = await import("./mongo/services/Carts.service.db.js");
    const { default: ProductService } = await import("./mongo/services/Products.service.db.js");
    const { default: UserService } = await import("./mongo/services/Users.service.db.js");
    const { default: ChatService } = await import("./mongo/services/Chats.service.db.js");

    Carts = new CartService(CartMongo);
    Products = new ProductService( ProductMongo);
    Users = new UserService (UserMongo);
    Chats = new ChatService (ChatMongo);
    break;
  case "MEMORY":
    const { default: CartFs } = await import("./mongo/services/Carts.service.fs.js");
    const { default: ProductFs } = await import("./mongo/services/Products.service.fs.js");
    const { default: UserFs } = await import("./mongo/services/Users.service.fs.js");
    const { default: ChatFs } = await import("./mongo/services/Chats.service.fs.js");

    Carts = new CartFs (CartMem);
    Products =new ProductFs (ProductMem);
    Users = new UserFs (UserMem);
    Chats = new ChatFs (ChatMem);

    break;
}

export default {
  Carts,
  Products,
  Users,
  Chats,
};
