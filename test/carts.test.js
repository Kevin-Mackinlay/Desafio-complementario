import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");

describe("Cart Controller", () => {
  it("should create a new cart successfully", async () => {
    const response = await requester.post("/api/carts");
    console.log(response.body);
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("the cart was created successfully");
    expect(response.body.payload).to.be.an("object");
  });

  it("should fetch all carts successfully", async () => {
    // Assuming you have an endpoint like `/api/carts` to fetch carts

    const response = await requester.get("/api/carts");
    console.log(response.body);
    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.data).to.be.an("array");
  });

  it("should fetch a cart by ID successfully", async () => {
    const cartId = "663adbb1b79d103f6a117763";
    const response = await requester.get(`/api/carts/${cartId}`);
    console.log(response.body);
    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.data).to.be.an("object");
  });
});
