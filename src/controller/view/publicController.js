const renderHome = async (req, res) => {
  res.render("home");
};

const renderLogin = (req, res) => {
  res.render("login");
};

const renderSignUp = (req, res) => {
  res.render("signup");
};

module.exports = { renderHome, renderLogin, renderSignUp };
