const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");

const User = require("../../models/user");
const app = require("../../server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("POST /auth/register", () => {
  it("should return user already exists if email already registered", async () => {
    await User.create({
      name: "kk",
      email: "kavya@gmail.com",
      password: "1234",
      role: "patient"
    });

    const response = await request(app)
      .post("/auth/register")
      .set("Accept", "application/json")
      .send({
        name: "kavya",
        email: "kavya@gmail.com",
        password: "1234",
        role: "patient"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("User already exists");
  });

  it("should register user successfully if email not registered", async () => {
    const response = await request(app)
      .post("/auth/register")
      .set("Accept", "application/json")
      .send({
        name: "kavya",
        email: "new@gmail.com",
        password: "1234",
        role: "patient"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });
});