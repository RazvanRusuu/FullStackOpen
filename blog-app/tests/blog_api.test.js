const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");

const { initialsBlogs, blogsDB, usersInDB } = require("./tests_helpers");
const app = require("../app");
const Blog = require("../models/Blog");
const { application } = require("express");

const api = supertest(app);

describe("when there is initially saved blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany();
    await Blog.insertMany(initialsBlogs);
  });

  test.only("blogs are returned as json", async () => {
    await api
      .get("/api/blog")
      .expect(200)
      .expect("Content-type", /application\/json/);
  });

  test("expected to get all blogs", async () => {
    const response = await api.get("/api/blog");

    assert.strictEqual(response.body.data.length, initialsBlogs.length);
  });

  test.only("total of likes is 15", async () => {
    const response = await api.get("/api/blog");
    const total = response.body.data.reduce((acc, curr) => acc + curr.likes, 0);

    assert.strictEqual(total, 15);
  });

  describe("viewing a specific note", () => {
    test("given id get correct blog", async () => {
      const blogs = await blogsDB();
      const firstBlog = blogs[0];

      const response = await api.get("/api/blog/" + firstBlog.id);

      assert.deepStrictEqual(response.body.data, firstBlog);
    });

    test("blog expect to have a property of id", async () => {
      const blogs = await blogsDB();
      const blogsHaveIdProp = blogs.every((blog) => blog.hasOwnProperty("id"));

      assert(blogsHaveIdProp, false);
    });
  });

  describe("addition of a new blog", () => {
    test("a valid blog can be added", async () => {
      const userAtStart = await usersInDB();
      const firstUser = userAtStart[0];

      const blog = {
        title: "Title",
        author: "Author",
        likes: 2,
        url: "url",
        userId: firstUser.id,
      };

      const newBlog = new Blog(blog);

      await api
        .post("/api/blog")
        .send(blog)
        .expect(201)
        .expect("Content-type", /application\/json/);

      const blogs = await blogsDB();

      assert(blogs.length, initialsBlogs.length);
      const authors = blogs.map((blog) => blog.author);
      assert(authors.includes(blog["author"]));
      await newBlog.deleteOne();
    });

    test("blog created without likes property", async () => {
      const blog = {
        title: "Title",
        author: "Author",
        url: "url",
      };
      const newBlog = new Blog(blog);
      const savedBlog = await newBlog.save();

      assert.strictEqual(savedBlog.likes, 0);
      await newBlog.deleteOne();
    });

    test("400 status if title, or url is missing", async () => {
      const repsonse = await api
        .post("/api/blog")
        .send({ title: "Title" })
        .expect(400);
    });
  });

  describe("update an existing blog", () => {
    test("update an existing resource with value of 99 likes", async () => {
      const blogs = await blogsDB();
      const firstblog = blogs[0];

      const response = await api
        .put("/api/blog/" + firstblog.id)
        .send({
          ...firstblog,
          likes: 99,
        })
        .expect(201);

      assert.strictEqual(response.body.data.likes, 99);
    });
  });

  describe("the blog could be deleted", () => {
    test("given existing blog's id, the blog is deleted from database", async () => {
      const initBlogs = await blogsDB();

      const firstBlog = initBlogs[0];

      await api.delete(`/api/blog/${firstBlog.id}`).expect(204);

      const blogs = await blogsDB();
      assert(initBlogs.length, blogs.length - 1);
    });

    test("given a wrong id, expect a 404 status number", async () => {
      const id = "0".repeat(24);
      await api.delete(`/api/blog/${id}`).expect(404);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
