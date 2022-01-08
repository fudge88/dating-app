const renderHome = (req, res) => {
  res.render("home");
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
