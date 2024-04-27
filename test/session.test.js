import chai from "chai";
import chaiHttp from "chai-http";
import server from "../app"; // Import your main Express application
import sinon from "sinon";
import passport from "passport";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Session Routes", function () {
  beforeEach(() => {
    // Mock passport authentication to always succeed
    sinon.stub(passport, "authenticate").callsFake((strategy, options, callback) => {
      return (req, res, next) => {
        if (!callback) {
          req.user = { id: "123", email: "test@example.com" }; // Simulate req.user
          return next();
        }
        callback(null, { id: "123", email: "test@example.com" }, null); // Simulate successful callback
      };
    });
  });

  afterEach(() => {
    sinon.restore(); // Restore original methods
  });

  // Test cases
  describe("POST /login", function () {
    it("should successfully log in a user", async function () {
      const res = await chai.request(server).post("/login").send({ username: "user", password: "pass" });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("success", true);
    });

    it("should fail when credentials are wrong", async function () {
      // Make passport.authenticate call the error callback
      sinon.restore(); // Remove successful stub
      sinon.stub(passport, "authenticate").callsFake(() => (req, res, next) => {
        return res.status(401).json({ success: false, message: "Authentication failed" });
      });

      const res = await chai.request(server).post("/login").send({ username: "user", password: "wrongpass" });

      expect(res).to.have.status(401);
      expect(res.body).to.have.property("success", false);
    });
  });

  describe("POST /signup", function () {
    it("should successfully register a user", async function () {
      const res = await chai.request(server).post("/signup").send({ username: "newuser", password: "newpass" });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("success", true);
    });
  });


});
