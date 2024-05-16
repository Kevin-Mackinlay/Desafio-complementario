export default class ViewsController {
  constructor(chatService, productService, ticketService, userService, cartService) {
    this.chatService = chatService;
    this.productService = productService;
    this.ticketService = ticketService;
    this.userService = userService;
    this.cartService = cartService;
  }

  renderHome = async (req, res) => {
    res.render("home", {
      title: "Home",
      user: req.user,
    });
  };

  renderProducts = async (req, res) => {
    try {
      const { limit = 8, page = 1, sort, category } = req.query;
      const filter = {
        options: {
          limit,
          page,
          lean: true,
        },
      };
      if (category) {
        filter.query = { category: category };
      }

      if (sort) {
        filter.options.sort = { price: sort };
      }
      const pagesData = await this.productService.getProducts(filter);
      console.log(pagesData);

      // COMMENT: La lógica que se utiliza acá no estaría en caso de trabajar con React, ya que se podría generar el link en el front-end
      const baseUrl = `http://localhost:8080/products?limit=${limit}`;
      // Creo links para las páginas anterior y siguiente de manera dinámica
      pagesData.prevLink = pagesData.hasPrevPage && `${baseUrl}&page=${pagesData.prevPage}${sort ? "&sort=" + sort : ""}${category ? "&category=" + category : ""}`;

      pagesData.nextLink = pagesData.hasNextPage && `${baseUrl}&page=${pagesData.nextPage}${sort ? "&sort=" + sort : ""}${category ? "&category=" + category : ""}`;

      if (pagesData.docs.length < 1) {
        res.status(404).json({
          success: false,
          message: "Could not retrieve products",
        });
        return;
      }

      res.render("products", {
        title: "Listado de productos",
        data: {
          products: pagesData.docs,
          prevLink: pagesData.prevLink,
          nextLink: pagesData.nextLink,
        },
        user: req.user,
        style: "css/products.css",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  renderLogin = async (req, res) => {
    res.render("login", {
      title: "Login",
      style: "css/login.css",
    });
  };

  renderSignup = async (req, res) => {
    res.render("signup", {
      title: "Registro",
      style: "css/signup.css",
    });
  };

  renderLogout = async (req, res) => {
    res.render("logout", {
      title: "Logout",
      user: req.user,
      style: "css/logout.css",
    });
  };

  renderRealTime = async (req, res) => {
    const products = await this.productsService.getProducts();
    res.render("realtime", {
      title: "Productos en tiempo real",
      products: products,
      style: "css/products.css",
    });
  };

  renderChat = async (req, res) => {
    const messages = await this.chatService.getMessages();
    res.render("chat", {
      title: "Chat",
      messages: messages,
      style: "css/chat.css",
    });
  };

  renderTickets = async (req, res) => {
    res.render("tickets", {
      title: "Tickets",
      user: req.user,
      style: "css/tickets.css",
    });
  };

  RecoverPassword = async (req, res) => {
    try {
      res.render("recoverPassword", {
        title: "Recover Password",
        style: "css/recoverPassword.css",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  newPassword = async (req, res) => {
    try {
      res.render("newPassword", {
        title: "New Password",
        style: "css/newPassword.css",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  renderCartView = async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await this.userService.getUser(userId);
      const cartId = user.car[0]._id;
      const cart = await this.cartService.getCartById(cartId);

      if (!cart) {
        return res.status(404).send({ error: "Cart not found" });
      }

      const productsInCart = cart.products;

      const cartDetail = [];
      let totalPrice = 0;

      for (let product of productsInCart) {
        const productDetail = await this.productService.getProductById(product.productID);
        productDetail = await productDetail.toObject(); // Convert to plain object
        productDetail.quantity = product.quantity;
        cartDetail.push(productDetail);
        totalPrice += productDetail.price * product.quantity;
      }
      res.render("cart", { cart, cartDetail, totalPrice });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  purchaseView = async (req, res) => {
    let purchaseComplete = []; //array de productos comprados
    let purchaseError = []; // array para productos que no se pudieron comprar
    let precioTotal = 0;
    const userId = req.user._id;

    try {
      const findUser = await this.userService.getUser(userId);
      if (!findUser) {
        throw new Error("User not found");
      }

      const cartId = findUser.cart[0]._id; // cart[0]porque es el primer elemento del array
      const cart = await this.cartService.getCartById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      const productsInCart = cart.products;

      for (let product of productsInCart) {
        const idProduct = product.productID;
        const quantity = product.quantity;
        const productDetail = await this.productService.getProductById(idProduct);

        if (quantity > productDetail.stock) {
          //verificamos que la compra no supere el stock
          purchaseError.push(productDetail); //agrega el producto al array de error
        }

        if (quantity <= productDetail.stock) {
          let productUpdate = productInDB;
          let quantityUpdate = productInDB.stock - quantity;
          productUpdate.stock = quantityUpdate; //actualizamos el stock
          const update = await this.productService.updateProduct(idProduct, productUpdate); //actualizamos el producto en la base de datos
          purchaseComplete.push(product); //agregamos el producto al array de compra
          const monto = productDetail.price * quantity;
          precioTotal = precioTotal + monto;
        }
      }

      //Eliminamos los productos que se procesaron correctamente del carrito, e insertamos el array de productos no procesados
      const notPurchasedProductsInCart = await this.cartService.insertArrayOfPorducts(cartId, purchaseError);

      // solo creamos el ticket si hay productos en purchaseComplete
      if (purchaseComplete.length > 0) {
        //definimos los datos que necesitamos para crear el ticket
        const ticketData = {
          amount: precioTotal,
          purchaser: req.user.email,
        };
        //creamos el ticket en la base de datos
        const ticket = await this.ticketService.createTicket(ticketData);

        //MODIFICACIONES PARA QUE RENDERICE LA VISTA:
        //agregamos informacion adicional, los productos que se procesaron correctamente y lo que no
        const purchaseData = {
          ticketId: ticket._id,
          amount: ticket.amount,
          purchase_datetime: ticket.purchase_datetime,
          purchaser: ticket.purchaser,
          productosProcesados: purchaseComplete,
          productosNoProcesados: purchaseError,
        };

        //renderizamos la vista 'purchase' con la informacion de la compra
        res.status(200).render("purchase", { status: "success", payload: purchaseData, cartId });
      } else {
        // Si no hay productos en purchaseComplete, renderizamos la vista 'error' con los productos en purchaseError
        res.status(200).send("errorPurchase", { status: "success", message: " No se procesaron  los productos, por falta de stock.", productosNoProcesados: purchaseError });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  };

  upLoadDocument = async (req, res) => {
    const userId = req.user._id;

    upload(req, res, (err) => {
      if (err) {
        return res.status(400).send({ message: err });
      }

      if (req.file == undefined) {
        return res.status(400).send({ message: "No file selected!" });
      }

      res.render("multer", {
        userId,
        file: `uploads/${req.file.filename}`, // Path to the uploaded file
      });
    });
  };
}
