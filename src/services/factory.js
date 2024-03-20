import config from "../config/config.js";

export let Carts;
export let Products;
export let Users;
export let Chats;

switch (config.persistence) {
  case "MONGO":
    const connection = await mongoose.connect(config.DB_URL);
    const { default: CartService } = await import("./mongo/services/db/Carts.service.db.js");
    const { default: ProductService } = await import("./mongo/services/db/Products.service.db.js");
    const { default: UserService } = await import("./mongo/services/db/User.service.db.js");
    const { default: ChatService } = await import("./mongo/services/db/Chat.service.db.js");

    Carts = new CartService(CartMongo);
    Products = new ProductService(ProductMongo);
    Users = new UserService(UserMongo);
    Chats = new ChatService(ChatMongo);
    break;
  case "MEMORY":
    const { default: CartFs } = await import("./mongo/services/Carts.service.fs.js");
    const { default: ProductFs } = await import("./mongo/services/Products.service.fs.js");
    const { default: UserFs } = await import("./mongo/services/Users.service.fs.js");
    const { default: ChatFs } = await import("./mongo/services/Chats.service.fs.js");

    Carts = new CartFs(CartMem);
    Products = new ProductFs(ProductMem);
    Users = new UserFs(UserMem);
    Chats = new ChatFs(ChatMem);

    break;
}

export default {
  Carts,
  Products,
  Users,
  Chats,
};
