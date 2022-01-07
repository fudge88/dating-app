const renderHome = (req, res) => {
  res.render("home");
};
const renderSearchPage = (req, res) => {
  res.render("searchPage");
};
const renderLogin = (req, res) => {
  res.render("login");
};
const renderSignUp = (req, res) => {
  res.render("sign-up");
};

module.exports = { renderHome, renderSearchPage, renderLogin, renderSignUp };
