import {CartServiceDb} from "../dao/factory.js";
import{ProductServiceDb} from "../dao/factory.js";
import {TicketServiceDb} from "../dao/factory.js";
import {UserServiceDb} from "../dao/factory.js";

import  CartsRepository  from "../repositories/carts.repository.js";
import ProductsRepository  from "../repositories/products.repository.js";
import  UsersRepository  from "../repositories/users.repository.js";
import  TicketsRepository  from "../repositories/ticket.repository.js";
import  ContactRepository  from "../repositories/contact.repository.js";


const userService = new UsersRepository(UserServiceDb);
const cartService = new CartsRepository(CartServiceDb);
const productService = new ProductsRepository(ProductServiceDb);
const ticketService = new TicketsRepository(TicketServiceDb);
// const contactService = new ContactRepository(ContactServiceDb);



export default {userService, cartService, productService, ticketService};
