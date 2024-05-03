import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");


describe("Product API Endpoints", () => {
   const mockProduct = {
     name: "Producto de prueba",
     description: "Descripción de prueba",
     price: 1000,
     stock: 10,
     thumbnail: "no hay",
     code: "1234",
     category: "test",
     status: true,
     owner: "admin",
   };
it("El endpoint POST /api/products debería crear un nuevo producto", async () => {
    const result = await requester.post("/api/products").send(mockProduct);
    const { _body, statusCode, ok } = result;
    expect(ok).to.be.true;
    expect(statusCode).to.be.equal(201);
  });
 

  // Test para la ruta GET '/'
  it("El endpoint GET /api/products debería devolver todos los productos", async () => {
    const result = await requester.get("/api/products").send();
    const { _body, statusCode, ok } = result;
    expect(ok).to.be.true;
  });

  // test para retornar un producto por id
  it("El endpoint GET /api/products/:id debería devolver un producto por id", async () => {
    const productId = "65b2d4ae2440be292ec978cb";
    const result = await requester.get(`/api/products/${productId}`).send();
    const { _body, statusCode, ok } = result;

    expect(ok).to.be.true;
    expect(statusCode).to.be.equal(200);
  });

  // it("El endpoint delete /api/products/:id debería eliminar un producto por id", async () => {
  //   const productId = "65b2d4ae2440be292ec978cb";
  //   const result = await requester.delete(`/api/products/${productId}`).send();
  //   const { _body, statusCode, ok } = result;
  //   console.log(_body);
  //   expect(ok).to.be.true;
  //   expect(statusCode).to.be.equal(200);
  // });

});




















  // it("El endpoint GET /api/products debería devolver todos los productos", async () => {
  //   const result = await requester.get("/api/products").send();
  //   const { _body, statusCode, ok } = result;
  //   console.log(_body);
  //   expect(ok).to.be.true;
  // });
