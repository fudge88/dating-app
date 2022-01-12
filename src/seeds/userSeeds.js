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
  {
    name: "Mary",
    email: "mary@email.com",
    password: "password1",
    age: 23,
    gender: "female",
    sexual_preference: "straight",
    about_me: "Looking for the one? Are you them?",
    location: "coventry",
    height: 1.85,
    build: "medium",
    seriousness: "medium",
  },
  {
    name: "ron",
    email: "ron@email.com",
    password: "password1",
    age: 31,
    gender: "male",
    sexual_preference: "straight",
    about_me: "Large, in charge and looking for love",
    location: "london",
    height: 1.85,
    build: "large",
    seriousness: "medium",
  },
  {
    name: "dan",
    email: "dan@email.com",
    password: "password1",
    age: 37,
    gender: "male",
    sexual_preference: "bisexual",
    about_me: "Young, Dumb and I hope you're the one",
    location: "birmingham",
    height: 1.7,
    build: "slim",
    seriousness: "high",
  },
  {
    name: "amy",
    email: "amy@email.com",
    password: "password1",
    age: 45,
    gender: "female",
    sexual_preference: "bisexual",
    about_me: "45, single and ready to mingle!",
    location: "nottingham",
    height: 1.65,
    build: "curvy",
    seriousness: "low",
  },
];

const seedUsers = async () => {
  const promises = userData.map((user) => User.create(user));
  await Promise.all(promises);
};

module.exports = seedUsers;
