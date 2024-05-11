export default class ViewsController {
  constructor(chatService, productService) {
    this.chatService = chatService;
    this.productService = productService;
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
    try{
    res.render("recoverPassword", {
      title: "Recover Password",
      style: "css/recoverPassword.css",
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  };

  newPassword = async (req, res) => {
    try{
    res.render("newPassword", {
      title: "New Password",
      style: "css/newPassword.css",
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  };
}
