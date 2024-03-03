const carts = [];

const createCart = async (req, res) => {
  const cart = req.body;
  carts.push(cart);
  res.send(cart);
};

async function getCarts(req, res) {
  res.send(carts);
}

async function getCartById(req, res) {
  const { cid } = req.params;
  const cart = carts.find((cart) => cart.id === cid);
  res.send(cart);
}

async function addProductToCart(res, req) {
    const { cid, pid } = req.params;
  const cart = await getCartById(cid);
  if (!cart) {
   res.send("Cart not found");
  }
  cart.products.push(pid);
  res.send(cart);
}

async function updateCart(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    // const cart = await getCartById(cid);
    // if (!cart) {
    //     res.send("Cart not found");
    // }
    // cart.products[pid] = quantity;
    // res.send(cart);
 
}

async function deleteProductFromCart(cid, pid) {
  const cart = await getCartById(cid);
  if (!cart) {
    return null;
  }
  cart.products = cart.products.filter((product) => product !== pid);
  return cart;
}

async function deleteCart(cid) {
  const cart = await getCartById(cid);
  if (!cart) {
    return null;
  }
  const index = carts.indexOf(cart);
  carts.splice(index, 1);
  return cart;
}

export { createCart, getCarts, getCartById, addProductToCart, deleteProductFromCart, deleteCart };

// To this snippet from src/controller/carts.controller.js:

//  try {
//    await cartsService.createCart({});

//    res.status(200).json({
//      success: true,
//      message: "New empty cart successfully created",
//    });
//  } catch (error) {
//    res.status(500).json({
//      success: false,
//      message: error.message,
//    });
//  }
