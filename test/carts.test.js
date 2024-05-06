import supertest from "supertest";
import { expect } from "chai";

const request = supertest("http://localhost:8080");

describe("Cart Controller", () => {

  let cartID;
  let productID = "65b2d4132440be292ec978c6"; // Assuming this is a valid product ID
  let cookie;
  let reqBody = {
    email:"prueba@gmail.com",
    password:"123456"
  };


    before(async () => {
      try {
        const res = await request.post("/api/sessions/login").send(reqBody);
        const cookieResult = res.headers["set-cookie"][0];
        expect(cookieResult).to.be.ok;
        expect(res.statusCode).to.equal(200);
        cookie = {
          name: cookieResult.split("=")[0],
          value: cookieResult.split("=")[1],
        };
        expect(cookie.name).to.be.ok.and.eql("coderCookie");
        expect(cookie.value).to.be.ok;
      } catch (error) {
        console.error(error);
        expect.fail("Request failed");
      }
    });

  
  
  
  it("should fetch all carts successfully", async () => {
    // Assuming you have an endpoint like `/api/carts` to fetch carts

    const response = await request.get("/api/carts");
     console.log(response.body);
    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.data).to.be.an("array");
  });

  it("should create a new cart successfully", async () => {
    // Assuming you have an endpoint like `/api/carts` to create a new cart

    const response = await request.post("/api/carts");
    console.log(response.body);
    expect(response.status).to.equal(201);
    expect(response.body.success).to.be.true;
    expect(response.body.data).to.be.an("object");
  });
 
});