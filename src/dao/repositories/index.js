import CartsRepository from "./carts.repository.js";
import ProductsRepository from "./products.repository.js";
import UsersRepository from "./users.repository.js";
import MessagesRepository from "./messages.repository.js";

import CartModel from "../models/cart.schema.js";
import ProductModel from "../models/product.schema.js";
import UserModel from "../models/user.schema.js";
import MessageModel from "../models/message.schema.js";

export default {
  carts: new CartsRepository(CartModel),
  products: new ProductsRepository(ProductModel),
  users: new UsersRepository(UserModel),
  chat: new MessagesRepository(MessageModel),
};
