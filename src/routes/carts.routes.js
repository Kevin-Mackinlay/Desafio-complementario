import express from "express";
import CartsService from "../services/db/Carts.service.db.js ";

const cartsService = new CartsService();

const cartsRouter = express.Router();

cartsRouter.post("/", async (req, res) => {
  try {
    await cartsService.createCart();

    res.status(200).json({
      success: true,
      message: "New empty cart successfully created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
cartsRouter.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsService.getCartById(cid);

    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart was not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Cart sent",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await cartsService.addProductToCart(cid, pid);
    if (!cart) {
      res.status(400).json({
        success: false,
        message: "Product ",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: `Product ${pid} added to cart ${cid}`,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default cartsRouter;
