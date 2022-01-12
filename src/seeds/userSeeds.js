const User = require("../models/User");

const userData = [
  {
    name: "bob",
    email: "bob@email.com",
    password: "password1",
    age: 21,
    gender: "male",
    sexual_preference: "straight",
    about_me: "tall dark and handsome",
    location: "birmingham",
    height: 1.85,
    build: "athletic",
    seriousness: "medium",
  },
  {
    name: "john",
    email: "john@email.com",
    password: "password1",
    age: 24,
    gender: "other",
    sexual_preference: "bisexual",
    about_me: "good things come in small packages",
    location: "coventry",
    height: 1.65,
    build: "slim",
    seriousness: "high",
  },
  // {
  //   user_name: "lisa",
  //   user_email: "lisa@email.com",
  //   user_password: "password1",
  //   user_age: 20,
  //   user_gender: "female",
  // },
  // {
  //   user_name: "maria",
  //   user_email: "maria@email.com",
  //   user_password: "password1",
  //   user_age: 24,
  //   user_gender: "female",
  // },
  // {
  //   user_name: "jack",
  //   user_email: "jack@email.com",
  //   user_password: "password1",
  //   user_age: 28,
  //   user_gender: "male",
  // },
];

const seedUsers = async () => {
  const promises = userData.map((user) => User.create(user));
  await Promise.all(promises);
};

module.exports = seedUsers;
