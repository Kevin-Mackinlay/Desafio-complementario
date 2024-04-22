import chai from "chai";
import chaiHttp from "chai-http";
import server from "../app"; // Import your Express application
import sinon from "sinon";
import passport from "passport";
import { CartController } from "../controllers/carts.controller.js";

const expect = chai.expect;
chai.use(chaiHttp);

// Mock the passportCall and authorization middleware
sinon.stub(passport, "authenticate").returns((req, res, next) => next());

describe("Cart Routes", function () {
  let cartsController;

  beforeEach(() => {
    cartsController = new CartController();
    sinon.restore(); // Restore all mocks to their original modules
  });

  describe("POST /carts", function () {
    it("should create a cart", async function () {
      sinon.stub(cartsController, "createCart").callsFake((req, res) => res.status(201).json(req.body));

      const cart = { userId: "1", items: [] };
      const res = await chai.request(server).post("/carts").send(cart);
      expect(res).to.have.status(201);
    });
  });

  describe("GET /carts", function () {
    it("should return all carts", async function () {
      sinon.stub(cartsController, "getCarts").callsFake((req, res) => res.json([{ cartId: 1, userId: "1", items: [] }]));

      const res = await chai.request(server).get("/carts");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
    });
  });

  describe("GET /carts/:cid", function () {
    it("should retrieve a cart by ID", async function () {
      sinon.stub(cartsController, "getCartById").callsFake((req, res) => res.json({ cartId: req.params.cid, items: [] }));

      const res = await chai.request(server).get("/carts/1");
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("cartId");
    });
  });

  describe("POST /carts/:cid/product/:pid", function () {
    it("should add a product to the cart", async function () {
      sinon.stub(cartsController, "addProduct").callsFake((req, res) => res.status(201).json({ message: "Product added" }));

      const res = await chai.request(server).post("/carts/1/product/10");
      expect(res).to.have.status(201);
      expect(res.body.message).to.equal("Product added");
    });
  });

  describe("DELETE /carts/:cid/product/:pid", function () {
    it("should remove a product from the cart", async function () {
      sinon.stub(cartsController, "deleteProductInCart").callsFake((req, res) => res.status(200).json({ message: "Product removed" }));

      const res = await chai.request(server).delete("/carts/1/product/10");
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal("Product removed");
    });
  });

  describe("POST /carts/:cid/purchase", function () {
    it("should process a cart purchase", async function () {
      sinon.stub(cartsController, "cartPurchase").callsFake((req, res) => res.status(201).json({ message: "Purchase successful" }));

      const res = await chai.request(server).post("/carts/1/purchase");
      expect(res).to.have.status(201);
      expect(res.body.message).to.equal("Purchase successful");
    });
  });

  describe("DELETE /carts/:cid", function () {
    it("should delete all products in the cart", async function () {
      sinon.stub(cartsController, "deleteProductsInCart").callsFake((req, res) => res.status(204).send());

      const res = await chai.request(server).delete("/carts/1");
      expect(res).to.have.status(204);
    });
  });
});
