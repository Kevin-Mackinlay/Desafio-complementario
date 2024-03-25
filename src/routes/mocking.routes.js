import express from "express";
import compression from "express-compression";
import mockingRouter from "./mocking.routes.js";
import { Router } from "express";


Router.use(compression({
    brotli: { enabled: true, zlib: {} },
    }));

Router.get("/mockingProducts", (req, res) => {
    let products = []
    let product = {
        id: "1",
        name: "product",
        price: 100,
        stock: 10,
    }

    for (let i = 0; i < 1000; i++) {
        products.push(product)
    }

    res.send({status:"success", totalProducts: products.length, products: products})
}
);

export default mockingRouter;



