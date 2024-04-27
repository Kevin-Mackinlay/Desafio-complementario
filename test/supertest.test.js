import supertest from "supertest";
import chai from "chai";

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Testing ecommerce", () => {
  describe("Testing products", () => {
    it("El endpoint POST /api/products debe crear un producto", async () => {
      const product = {
        name: "Producto de prueba",
        price: 100,
        stock: 10,
        image: "https://via.placeholder.com/150",
      };

      const result = await request.post("/api/products").send(product);
    //   expect(result.ok).to.be.true;
      expect(result._body.status).to.be.equal("success");
      
    //   console.log("··········RESULTADO··········");
    //   console.log(result.body);
    //   console.log(result.statusCode);
    //   console.log(result.ok);
    });
  });
});
