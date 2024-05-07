import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");

describe("Cart Controller", () => {

  // let cartID;
  // let productID = "65b2d4132440be292ec978c6"; // Assuming this is a valid product ID
const mockCart = { products: [{ product: "65b2d4132440be292ec978c6", quantity: 2 }] };

it("should create a new cart successfully", async () => {
  const result = await requester.post("/api/carts").send(mockCart);
  const {_body, statusCode, ok} = result;
  expect(ok).to.be.true;
  expect(statusCode).to.be.equal(201);
}); 

  
  it("should fetch all carts successfully", async () => {
    // Assuming you have an endpoint like `/api/carts` to fetch carts

    const response = await requester.get("/api/carts");
    console.log(response.body);
    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.data).to.be.an("array");
  });
});