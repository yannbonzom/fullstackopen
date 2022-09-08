const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body;

  if (!username || !password)
    return response.status(400).json({ error: "content missing" });
  if (username.length < 3 || password.length < 3)
    return response.status(400).json({
      error: "username and password must be at least 3 characters long",
    });
  const existingUser = await User.findOne({ username });
  if (existingUser)
    return response.status(400).json({ error: "username must be unique" });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    name,
    username,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  return response.json(users);
});

module.exports = usersRouter;
