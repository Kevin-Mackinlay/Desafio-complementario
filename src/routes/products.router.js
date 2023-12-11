import { Router } from "express";
import { ProductManager } from "../classes/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./products.json");


router.get("/", async (req, res) => {
 const { limit } = req.query;
  try {
    let response = await productManager.getProducts();

    if (limit) {
      tempArray = response.filter((dat, index) => index < limit);

      res.json({
        data: tempArray,
        limit: limit,
        quantity: tempArray.length,
      });
    } else {
      res.json({ data: response, limit: false, quantity: response.length });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    let product = await productManager.getProductById(pid);

    if (product) {
      res.json({ message: "success", data: product });
    } else {
      res.json({
        message: "el producto solicitado no existe",
      });
    }
  } catch (err) {
    console.log(err);
  }
});


router.post("/", (req, res) => {  
  res.send("hola mundo desde router de user");
});

router.put("/", (req, res) => {
  res.send("hola mundo desde router de user");
});

router.delete("/", (req, res) => {
  res.send("hola mundo desde router de user");
});

export default router;
