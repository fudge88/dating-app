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
];

const seedUsers = async () => {
  const promises = userData.map((user) => User.create(user));
  await Promise.all(promises);
};

module.exports = seedUsers;
