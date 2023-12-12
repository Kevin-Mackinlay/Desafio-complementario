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

router.post("/", async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  try{
  
 const result = await productManager.addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  );
 res.json({ message: "success", data:result });
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "error", data: err });
  }
});

router.put("/", (req, res) => {
  res.send("hola mundo desde router de user");
});

router.delete("/", (req, res) => {
  res.send("hola mundo desde router de user");
});

export default router;
