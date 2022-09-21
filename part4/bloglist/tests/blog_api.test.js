const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./blog_test_helper");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);
let token;

beforeAll(async () => {
  await User.deleteMany({});
  const user = {
    name: "Pierri",
    username: "pierrimou",
    password: "bababierre",
  };
  await api.post("/api/users").send(user).expect(201);
  const userToLogin = {
    username: "pierrimou",
    password: "bababierre",
  };
  const loggedInUser = await api
    .post("/api/login")
    .send(userToLogin)
    .expect(200);
  token = `bearer ${loggedInUser.body.token}`;
});

beforeEach(async () => {
  // await Blog.deleteMany({});
  // const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  // const promiseArray = blogObjects.map((blogObject) => blogObject.save());
  // await Promise.all(promiseArray);

  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
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
    await api.post("/api/blogs").send(blog).set({ Authorization: token });
    const request = await api.get("/api/blogs");
    expect(request.body).toHaveLength(helper.initialBlogs.length + 1);
  }, 100000);

  test("posting a blog that does not contain likes defaults to 0", async () => {
    const blog = {
      title: "React patterns",
      author: "Yann Bonzom",
      url: "https://reactpatterns.com/",
    };
    const result = await api
      .post("/api/blogs")
      .send(blog)
      .set({ Authorization: token });
    expect(result.body.likes).toBe(0);
  });

  test("posting blog without title and/or url responds with 400", async () => {
    const blog = {
      author: "Yann Bonzom",
      likes: 7,
    };
    await api
      .post("/api/blogs")
      .send(blog)
      .set({ Authorization: token })
      .expect(400);
  });

  test("deleting blog responds with 204 if id valid", async () => {
    const blogToDelete = {
      title: "Web dev",
      author: "Carl",
      url: "url1",
      likes: 3,
    };
    const savedBlog = await api
      .post("/api/blogs")
      .send(blogToDelete)
      .set({ Authorization: token });

    await api
      .delete(`/api/blogs/${savedBlog.body.id}`)
      .set({ Authorization: token })
      .expect(204);

    // const blogsAtEnd = await helper.blogsInDb();
    // expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    // const titles = blogsAtEnd.map((blog) => blog.title);
    // expect(titles).not.toContain(blogToDelete.title);
  });

  test("updating blog changes contents correctly", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const blogUpdated = {
      id: "5a422a851b54a676234d17f7",
      title: "React patterns (UPDATED)",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    };

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogUpdated);
    const blogsAfterUpdate = await helper.blogsInDb();
    const titles = blogsAfterUpdate.map((blog) => blog.title);
    expect(titles).toContain(blogUpdated.title);
  });
});

afterAll(() => mongoose.connection.close());
