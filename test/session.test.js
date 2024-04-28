import supertest from "supertest";
import {expect} from "chai";
import { app } from "../src/app.js";




const requester = supertest(app);

describe("Testing proyecto final", () => {
  describe("testing session", () => {
    it("Register a new user", async () => {
      const user = {
        firstName: "John",
        lastName: "Doe",
        email: " doejhon@gmail.com",
        password: "123456",
        age: 25,
        role:"user",
      };

      const response = await requester.post("/api/session/signup").send(user);
      expect(response._body.status).to.be.equal("success");
    });
  });
});

describe("Login", () => {
  it("Login a user", async () => {
    const user = {
      email: "",
      password: "",
    };
    const response = await requester.post("/api/session/login").send(user);
    expect(response._body.status).to.be.equal("success");
  }
  );
}
);

describe("GET /", () => {
  it("this endpoint should return all the users", async () => {
    const response = await requester.get("/api/users/getAllUsers");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });
}
);


