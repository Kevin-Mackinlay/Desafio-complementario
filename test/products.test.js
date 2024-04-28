import supertest from "supertest";
import {expect} from "chai";



const request = supertest("http://localhost:8080");

  describe("POST /", () => {
    it("this endpoint should create a new product", async () => {
      const product = await request.post("/").send({
        name: "product",
        price: 1000,
        stock: 10,
      });
      const response = await request.post("/api/products/createProduct").send(product);
      expect(response._body.status).to.be.equal("success");
    });
  });


  describe("PUT /", () => {
    it("this endpoint should update a product", async () => {
      const product = await request.put("/1").send({
        name: "product",
        price: 56000,
        stock: 40,
      });
     const response = await request.put("/api/products/updateProduct").send(product);
      expect(response._body.status).to.be.an("object");
    });
  });

  describe("DELETE /", () => {
    it("this endpoint should delete a product", async () => {
      const response = await request.delete("/api/products/deleteProduct/1");
      expect(response._body.status).to.be.equal(200);
    });
  });

