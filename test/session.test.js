import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");

const newUser = {
  firstName: "prueba11",
  lastName: "test",
  age: 25,
  email: "pepe5@gmail.com",
  password: "123456",
};

let cookie;
// let idUser;
describe("Testing proyecto final", () => {
  describe("testing session", () => {
    it("El endpoint /api/sessions/signup debería crear un nuevo usuario", async () => {
      const response = await requester.post("/api/sessions/signup").send(newUser);
      expect(response.status).to.equal(201);
      console.log(response);
    }).timeout(5000);

    it("El endpoint POST /api/sessions/login debería loguear un usuario", async () => {
      const response = await requester.post("/api/sessions/login").send(newUser);
      const cookieResult = response.headers["set-cookie"][0];
      console.log(cookieResult);
      expect(cookieResult).to.be.ok;
      cookie = {
        name: cookieResult.split("=")[0],
        value: cookieResult.split("=")[1].split(";")[0], // You might also need to handle the cookie value parsing better to remove any trailing properties like path, expires, etc.
      };
      expect(response.status).to.equal(200);
      expect(cookie.name).to.be.ok.and.eql("cookieTest");
      expect(cookie.value).to.be.ok.and.eql("coderCookie");
    }).timeout(5000);

    // it("El endpoint GET /api/sessions/current debería devolver la información del usuario logueado", async () => {
    // 	const response = await requester
    // 		.get("/api/sessions/current")
    // 		.set("Cookie", [`${cookie.name}=${cookie.value}`]);
    // 	expect(response.body.payload.email).to.be.eql(newUser.email);
    // 	console.log(response);
    // }).timeout(5000);
  });
});
