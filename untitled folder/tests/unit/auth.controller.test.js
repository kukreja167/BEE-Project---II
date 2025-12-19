jest.mock("../../models/user");
jest.mock("jsonwebtoken");


const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const { register,login } = require("../../controller/authController");

describe("Auth Controller - Unit Tests", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should return 400 if required fields are missing", async () => {
      const req = {
        body: { email: "a@test.com" },
        headers: { accept: "application/json" }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Missing fields" });
    });

    it("should return 400 if user already exists", async () => {
      User.findOne.mockResolvedValue({ email: "a@test.com" });

      const req = {
        body: {
          name: "Kavya",
          email: "a@test.com",
          password: "1234",
          role: "patient"
        },
        headers: { accept: "application/json" }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await register(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "a@test.com" });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "User already exists"
      });
    });

    it("should register user successfully", async () => {
      User.findOne.mockResolvedValue(null);
      User.prototype.save = jest.fn();

      const req = {
        body: {
          name: "Kavya",
          email: "new@test.com",
          password: "1234",
          role: "patient"
        },
        headers: { accept: "application/json" }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "User registered successfully"
      });
    });
  });

  describe("login", () => {
    it("should fail login if credentials are invalid", async () => {
      User.findOne.mockResolvedValue(null);

      const req = {
        body: {
          email: "a@test.com",
          password: "wrong"
        },
        headers: { accept: "application/json" }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid email or password"
      });
    });

    it("should login successfully and return token", async () => {
      const mockUser = {
        _id: "123",
        matchPassword: jest.fn().mockResolvedValue(true)
      };

      User.findOne.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue("fake-jwt-token");

      const req = {
        body: {
          email: "a@test.com",
          password: "1234"
        },
        headers: { accept: "application/json" }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        cookie: jest.fn()
      };

      await login(req, res);

      expect(jwt.sign).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Login successful"
      });
    });
  });
});