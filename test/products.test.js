import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");

describe("testing de productos", () => {
  let productId;

  const productMock = {
    title: "Producto de prueba",
    description: "Descripción de prueba",
    price: 100,
    thumbnail: "https://www.google.com",
    code: "123456",
    stock: 10,
    status: true,
    owner: "admin",
  };

  // Test para la ruta POST '/'
  it("debería crear un nuevo producto", async () => {
    const res = await requester.post("/api/products").send(productMock);
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.be.an("object");
    expect(res.body.payload).to.have.property("_id");
    productId = res.body.payload._id;
  });

  // it("El endpoint GET /api/products debería devolver todos los productos", async () => {
  //   const result = await requester.get("/api/products").send();
  //   const { _body, statusCode, ok } = result;
  //   console.log(_body);
  //   expect(ok).to.be.true;
  // });
});





