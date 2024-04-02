import {CartServiceDb, ProductServiceDb, UserServiceDb, ChatServiceDb, TicketServiceDb} from "../dao/db/index.js";
import { CartsRepository } from "../repositories/carts.repository.js";
import { ProductsRepository } from "../repositories/products.repository.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { ChatRepository } from "../repositories/chat.repository.js";
import { TicketsRepository } from "../repositories/tickets.repository.js";


const userService = new UsersRepository(UserServiceDb);
const cartService = new CartsRepository(CartServiceDb);
const productService = new ProductsRepository(ProductServiceDb);
const chatService = new ChatRepository(ChatServiceDb);
const ticketService = new TicketsRepository(TicketServiceDb);


export default {userService, cartService, productService, chatService, ticketService};