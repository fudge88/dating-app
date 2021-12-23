const User = require("../models/User");

const userData = [
  {
    user_name: "bob",
    user_email: "bob@email.com",
    user_password: "password1",
    user_age: 21,
    user_gender: "male",
  },
  {
    user_name: "john",
    user_email: "john@email.com",
    user_password: "password1",
    user_age: 24,
    user_gender: "male",
  },
  {
    user_name: "lisa",
    user_email: "lisa@email.com",
    user_password: "password1",
    user_age: 20,
    user_gender: "female",
  },
  {
    user_name: "maria",
    user_email: "maria@email.com",
    user_password: "password1",
    user_age: 24,
    user_gender: "female",
  },
  {
    user_name: "jack",
    user_email: "jack@email.com",
    user_password: "password1",
    user_age: 28,
    user_gender: "male",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
