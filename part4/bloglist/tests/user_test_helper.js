const User = require("../models/user");

const initialUsers = [
  {
    name: "Yann",
    username: "bossvanlindt",
    password: "password123",
  },
  {
    name: "Micky",
    username: "mickimykonos",
    password: "Hase1",
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialUsers,
  usersInDb,
};
