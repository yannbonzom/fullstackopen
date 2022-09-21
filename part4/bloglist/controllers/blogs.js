const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const userToken = request.user;
  if (!userToken)
    return response
      .status(401)
      .json({ error: "token missing or invalid token" });
  if (!body.title || !body.url)
    return response.status(400).json({ error: "content missing" }).end();

  const user = await User.findById(userToken.id);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const userToken = request.user;
  if (!userToken)
    return response
      .status(401)
      .json({ error: "token missing or invalid token" });
  const blogToDelete = await Blog.findById(request.params.id);
  if (!blogToDelete)
    return response.status(400).json({ error: "blog already deleted" });
  if (blogToDelete.user.toString() === userToken.id.toString()) {
    await blogToDelete.delete();
    response.sendStatus(204).end();
  } else {
    response
      .status(403)
      .json({ error: "user is not owner of blog to be deleted" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
