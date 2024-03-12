const { describe, test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const app = require("../app");
const User = require("../models/User");
const helper = require("./tests_helpers");

const api = supertest(app);

describe("when there are user in DB", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);

    const user = new User({
      username: "root",
      name: "rusu razvan",
      passwordHash,
    });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: "razdsadsa",
      name: "razvan",
      password: "123321",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const userAtEnd = await helper.usersInDB();

    assert.strictEqual(userAtEnd.length, usersAtStart.length + 1);

    const usernames = userAtEnd.map((user) => user.username);

    assert(usernames.includes(newUser.username));
  });

  test("creation failed with proper status code if username already taken", async () => {
    const userAtStart = await helper.usersInDB();

    const newUser = {
      username: "root",
      name: "someName",
      password: "sekure",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const userAtEnd = await helper.usersInDB();

    assert(result.body.error.includes("Expected username to be unique"));

    assert.strictEqual(userAtEnd.length, userAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
