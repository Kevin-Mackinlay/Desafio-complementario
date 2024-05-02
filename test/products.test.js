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
    category: "test",
  };

  // Test para la ruta POST '/'
  it("debería crear un nuevo producto", async () => {
    const res = await requester.post("/api/products").send(productMock);

    expect(res.statusCode).to.equal(200);

    expect(res.body).to.be.an("object");
    console.log(res);
    expect(res.body.payload).to.have.property("_id");
    productId = res.body.payload._id;
  });

  it("should update an existing product for premium users", async () => {
    const productId = "existing_product_id"; // Replace with a valid product ID
    const updateData = {
      title: "Updated Title",
      price: 200,
    };
    // Set headers or auth as needed to simulate a premium user
    const response = await request.put(`/api/products/${productId}`).send(updateData).set("Authorization", `Bearer your_token_here`); // Include the correct authorization header

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status", "Product has been updated successfully");
    expect(response.body.message).to.include(`The product was updated ${updateData.title}`);
  });

  // it("El endpoint GET /api/products debería devolver todos los productos", async () => {
  //   const result = await requester.get("/api/products").send();
  //   const { _body, statusCode, ok } = result;
  //   console.log(_body);
  //   expect(ok).to.be.true;
  // });
});




















  // it("El endpoint GET /api/products debería devolver todos los productos", async () => {
  //   const result = await requester.get("/api/products").send();
  //   const { _body, statusCode, ok } = result;
  //   console.log(_body);
  //   expect(ok).to.be.true;
  // });
