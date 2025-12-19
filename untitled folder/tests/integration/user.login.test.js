const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");

const User = require("../../models/user");
const app = require("../../server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("POST /auth/login", () => {
  it("should fail login for invalid credentials", async () => {
    await User.create({
      name: "Kavya",
      email: "kavya@gmail.com",
      password: "1234",
      role: "patient"
    });

    const response = await request(app)
      .post("/auth/login")
      .set("Accept", "application/json")
      .send({
        email: "kavya@gmail.com",
        password: "wrongpassword"
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
  });

  it("should login successfully with valid credentials", async () => {
    await User.create({
      name: "Kavya",
      email: "kavya@gmail.com",
      password: "1234",
      role: "patient"
    });

    const response = await request(app)
      .post("/auth/login")
      .set("Accept", "application/json")
      .send({
        email: "kavya@gmail.com",
        password: "1234"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.headers["set-cookie"]).toBeDefined();
  });
});