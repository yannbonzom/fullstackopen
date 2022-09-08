const loginRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  // Check that password & user correct
  const user = await User.find({ username });
  const passwordCorrect = user
    ? false
    : bcrypt.compare(password, user.passwordHash);
  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: "invalid username or password" });
  }

  const userForToken = {
    username: user.username,
    id: user_id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);

  response.status(200).send({
    token,
    username: user.username,
    name: user.name,
  });
});

module.exports = loginRouter;
