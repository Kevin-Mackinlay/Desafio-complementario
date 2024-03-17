import config from "../config/config.js";
import mongoose from "mongoose";

export let Carts;
export let Products;
export let Users;
export let Chats;


switch (config.persistence) {
  case "MONGO":
    const connection = await mongoose.connect(config.DB_URL);
    const { default: CartMongo } = await import("./mongo/cart.mongo.js");
    const { default: ProductMongo } = await import("./mongo/product.mongo.js");
    const { default: UserMongo } = await import("./mongo/user.mongo.js");
    const { default: ChatMongo } = await import("./mongo/message.mongo.js");

    Carts = CartMongo;
    Products = ProductMongo;
    Users = UserMongo;
    Chats = ChatMongo;
    break;
  case "MEMORY":
    const { default: CartMem } = await import("./memory/cart.memory.js");
    const { default: ProductMem } = await import("./memory/product.memory.js");
    const { default: UserMem } = await import("./memory/user.memory.js");
    const { default: ChatMem } = await import("./memory/message.memory.js");

    Carts = CartMem;
    Products = ProductMem;
    Users = UserMem;
    Chats = ChatMem;

    break;
}

export default {
  Carts,
  Products,
  Users,
  Chats,
};