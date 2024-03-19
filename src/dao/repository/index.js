import { Carts, Products, Users, Chats } from "../dao/factory.js";
import CartsRepository from "./Carts.repository.js";
import ProductsRepository from "./Products.repository.js";
import ChatsRepository from "./Chat.repository.js";
import UserRepository from "./User.repository.js";

export const cartService = new Carts();
export const productsService = new Products();
export const chatsService = new Chats();
export const usersService = new Users();
