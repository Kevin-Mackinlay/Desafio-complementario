import { Router } from "express";
import compression from "express-compression";
import {faker} from "@faker-js/faker";
// import logger from "../utils/logger.js";

const mockingRouter = Router();

mockingRouter.get("/", (req, res) => {
  let products = [];
  let product = {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnails: faker.image.url(),
    stock: faker.number.int(100),
    code: faker.finance.bitcoinAddress(),
  };

  for (let i = 0; i < 1000; i++) {
    products.push(product);
  }

  res.send({ status: "success", totalProducts: products.length, products: products });
});

mockingRouter.get("/mockingusers", (req, res) => {
  let user = {
    _id: faker.database.mongodbObjectId(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    userName: faker.internet.displayName(),
    password: faker.internet.password(),
    birthDate: faker.date.birthDate(),
  };
  res.send({ status: "success", user: user });
});

export default mockingRouter;
