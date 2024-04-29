import supertest from "supertest";
import { expect } from "chai";
import { app } from "../src/app.js";

import { cartService } from "../src/services/services.js";
import { userService } from "../src/services/services.js";

const requester = supertest(app);

const newUser = {
  firstName: "prueba11",
  lastName: "test",
  age: 25,
  email: "pepe@gmail.com",
  password: "123456",
};

let cookie;

describe("Testing proyecto final", () => {
  describe("testing session", () => {

    it("El endpoint /api/sessions/signup debería crear un nuevo usuario", async () => {
      const response = await requester.post("/api/sessions/signup").send(newUser);
      expect(response.status).to.equal(200);
      console.log(response);
    }).timeout(5000);

    it("El endpoint POST /api/sessions/login debería loguear un usuario", async () => {
      const response = await requester.post("/api/sessions/login").send(newUser);
      const cookieResult = response.headers["set-cookie"][0];
      expect(cookieResult).to.be.ok;
     cookie = {
       name: cookieResult.split("=")[0],
       value: cookieResult.split("=")[1].split(";")[0], // You might also need to handle the cookie value parsing better to remove any trailing properties like path, expires, etc.
     };

      expect(cookie.name).to.be.ok.and.eql("coderCookie");
      expect(cookie.value).to.be.ok;
     
    }).timeout(5000);

    it("El endpoint GET /api/sessions/current debería devolver la información del usuario logueado", async () => {
      const response = await requester.get("/api/sessions/current").set("Cookie", [`${cookie.name}=${cookie.value}`]);
      expect(response.body.payload.email).to.be.eql(newUser.email);
      console.log(response);
    }).timeout(5000);
  });
});
