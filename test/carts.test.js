import supertest from "supertest";
import { expect } from "chai";

const request = supertest("http://localhost:8080");

describe("GET /carts", () => {
  it("should fetch all carts successfully", async () => {
    // Assuming you have an endpoint like `/api/carts` to fetch carts

    const response = await request.get("/api/carts");
     console.log(response.body);
    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.data).to.be.an("array");
  });

 
});