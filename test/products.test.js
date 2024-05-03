import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");


describe("Product API Endpoints", () => {
  // Testing GET /products endpoint
  // Test para la ruta GET '/'
  it("El endpoint GET /api/products debería devolver todos los productos", async () => {
    const result = await requester.get("/api/products").send();
    const { _body, statusCode, ok } = result;
    console.log(_body);
    expect(ok).to.be.true;
  });

  // test para retornar un producto por id
  it("El endpoint GET /api/products/:id debería devolver un producto por id", async () => {
    const productId = "65b2d4ae2440be292ec978cb";
    const result = await requester.get(`/api/products/${productId}`).send();
    const { _body, statusCode, ok } = result;
    console.log(_body);
    expect(ok).to.be.true;
    expect(statusCode).to.be.equal(200);
  });

});




















  // it("El endpoint GET /api/products debería devolver todos los productos", async () => {
  //   const result = await requester.get("/api/products").send();
  //   const { _body, statusCode, ok } = result;
  //   console.log(_body);
  //   expect(ok).to.be.true;
  // });
