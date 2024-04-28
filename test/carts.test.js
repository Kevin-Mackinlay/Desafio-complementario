import supertest from "supertest";
import { expect } from "chai";

const request = supertest("http://localhost:8080");

describe("POST /", () => {
  it("this endpoint should create a new cart", async () => {
    const cart = await request.post("/").send({
      userId: 1,
      products: [
        {
          productId: 1,
          quantity: 2,
        },
      ],
    });
    const response = await request.post("/api/carts/createCart").send(cart);
    expect(response._body.status).to.be.equal("success");
  }
  );
}
);

describe("GET /", () => {
  it("this endpoint should return all the carts", async () => {
    const response = await request.get("/api/carts");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  }
  );
}
);

describe("GET /:id", () => {
  it("this endpoint should return a cart by id", async () => {
    const response = await request.get("/api/carts/1");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("object");
  }
  );
}
);  // Path: Tercera-preEntrega-PF/test/products.test.js