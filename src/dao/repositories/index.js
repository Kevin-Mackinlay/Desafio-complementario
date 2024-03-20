import { Carts, Products, Users, Chats } from "../../services/factory.js";
// import CartsRepository from "./cart.repository.js";
// import ProductsRepository from "./product.repository.js";
// import ChatsRepository from "./chat.repository.js";
// import UserRepository from "./user.repository.js";

export const cartService = new Carts();
export const productsService = new Products();
export const chatsService = new Chats();
export const usersService = new Users();
