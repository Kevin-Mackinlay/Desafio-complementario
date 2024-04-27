import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/app.js"; // Import your Express application
import sinon from "sinon";
import passport from "passport";
import { ProductsController } from "../src/controllers/products.controller.js";

const expect = chai.expect;
chai.use(chaiHttp);

// Mock the passportCall and authorization middleware
sinon.stub(passport, "authenticate").returns((req, res, next) => next());

describe("Product Routes", function () {
  let productsController;

  beforeEach(() => {
    productsController = new ProductsController();
    sinon.restore(); // Restore all mocks to their original modules
  });

  describe("GET /products", function () {
    it("should return all products", async function () {
      sinon.stub(productsController, "getProducts").callsFake((req, res) => res.json([{ id: 1, name: "Product 1" }]));

      const res = await chai.request(server).get("/products");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("id");
      expect(res.body[0].name).to.equal("Product 1");
    });
  });

  describe("GET /products/:pid", function () {
    it("should return a single product", async function () {
      sinon.stub(productsController, "getProductById").callsFake((req, res) => res.json({ id: req.params.pid, name: "Specific Product" }));

      const res = await chai.request(server).get("/products/1");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.name).to.equal("Specific Product");
    });
  });

  describe("POST /products", function () {
    it("should create a product", async function () {
      sinon.stub(productsController, "createProduct").callsFake((req, res) => res.status(201).json(req.body));

      const product = { name: "New Product", price: 19.99 };
      const res = await chai.request(server).post("/products").send(product);
      expect(res).to.have.status(201);
      expect(res.body.name).to.equal("New Product");
    });
  });

  // Continue with PUT and DELETE tests...
});

describe("PUT /products/:pid", function () {
  it("should update a product", async function () {
    sinon.stub(productsController, "updateProduct").callsFake((req, res) => res.json({ id: req.params.pid, ...req.body }));

    const product = { name: "Updated Product" };
    const res = await chai.request(server).put("/products/1").send(product);
    expect(res).to.have.status(200);
    expect(res.body.name).to.equal("Updated Product");
  });
});

describe("DELETE /products/:pid", function () {
  it("should delete a product", async function () {
    sinon.stub(productsController, "deleteProduct").callsFake((req, res) => res.status(204).send());

    const res = await chai.request(server).delete("/products/1");
    expect(res).to.have.status(204);
  });
});
