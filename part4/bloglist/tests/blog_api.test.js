const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blogObject) => blogObject.save());
  await Promise.all(promiseArray);
});

describe("blog api:", () => {
  test("all blogs are returned in JSON format", async () => {
    const response = await api
      .get("/api/blogs")
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("blogs returned contain an id property", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

  test("post a blog increments blog count and adds content", async () => {
    const blog = {
      title: "React patterns",
      author: "Yann Bonzom",
      url: "https://reactpatterns.com/",
      likes: 7,
    };
    await api.post("/api/blogs").send(blog);
    const request = await api.get("/api/blogs");
    expect(request.body).toHaveLength(helper.initialBlogs.length + 1);
  }, 100000);

  test("posting a blog that does not contain likes defaults to 0", async () => {
    const blog = {
      title: "React patterns",
      author: "Yann Bonzom",
      url: "https://reactpatterns.com/",
    };
    const result = await api.post("/api/blogs").send(blog);
    expect(result.body.likes).toBe(0);
  });

  test("posting blog without title and/or url responds with 400", async () => {
    const blog = {
      author: "Yann Bonzom",
      likes: 7,
    };
    await api.post("/api/blogs").send(blog).expect(400);
  });
});

afterAll(() => mongoose.connection.close());
