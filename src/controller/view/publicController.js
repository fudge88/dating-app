const { User } = require("../../models");

const renderHome = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    const users = allUsers.map((user) => {
      return user.get({ plain: true });
    });

    const randomUserIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomUserIndex];
    console.log("randomUser", randomUser);

    res.render("home", { randomUser });
  } catch (error) {
    console.log(error);
  }

  // get all users
  // users.length to get length of array
  // generate a random number
  // get one user by id (random)
};
const renderSearchPage = (req, res) => {
  res.render("search");
};
const renderLogin = (req, res) => {
  res.render("login");
};
const renderSignUp = (req, res) => {
  res.render("signup");
};

module.exports = { renderHome, renderSearchPage, renderLogin, renderSignUp };
