const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./user_test_helper");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

describe("Create user:", () => {
  test("correct user format returns 201", async () => {
    const user = {
      name: "Pierri",
      username: "pierrimou",
      password: "bababierre",
    };
    const savedUser = await api.post("/api/users").send(user).expect(201);
    expect(savedUser.body.username).toBe(user.username);
  });
  test("missing content returns 400 & error", async () => {
    const user = { password: "bababierre" };
    const response = await api.post("/api/users").send(user).expect(400);
    expect(response.body.error).toBe("content missing");
  });
  test("username/password.length < 3 returns 400", async () => {
    const user = {
      name: "Pierri",
      username: "pi",
      password: "baba",
    };
    const response = await api.post("/api/users").send(user).expect(400);
    expect(response.body.error).toBe(
      "username and password must be at least 3 characters long"
    );
  });
  test("username taken returns 400", async () => {
    const user = {
      name: "Yann",
      username: "bossvanlindt",
      password: "bababierre",
    };
    const response = await api.post("/api/users").send(user).expect(400);
    expect(response.body.error).toBe("username must be unique");
  });
});

afterAll(() => mongoose.connection.close());
