import { Router } from "express";
// import { CartManager } from "../classes/CartManager.js";
import Cart from "../dao/dbmanager/cart.js";

const router = Router();
// const cartManager = new CartManager("./carts.json");
const cart = new Cart();

router.get("/", async (req, res) => {
  try {
    let response = await cart.getAll();
    res.json({ data: response });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    let response = await cart.getById(cid);
    res.json( response );
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    let response = await cart.saveCart();
    res.json({ message: "success", data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error", data: err });
  }
});



router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    let response = await cart.addProductToCart(cid, pid);
    res.json({ message: "success", data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error", data: err });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    let response = await cart.deleteProductFromCart(cid, pid);
    res.json({ message: "success", data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error", data: err });
  }
} );

export default router;


// router.get("/", async (req, res) => {
//   try {
//     let response = await cartManager.getCarts();
//     res.json({ data: response });
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get("/:cid", async (req, res) => {
//   const { cid } = req.params;
//   try {
//     let response = await cartManager.getCartById(cid);
//     res.json({ data: response });
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     let response = await cartManager.addCart();
//     res.json({ message: "success", data: response });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "error", data: err });
//   }
// });

// router.post("/:cid/products/:pid", async (req, res) => {
//   const { cid, pid } = req.params;
//   try {
//     let response = await cartManager.addProductToCart(cid, pid);
//     res.json({ message: "success", data: response });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "error", data: err });
//   }
// });

// export default router;
