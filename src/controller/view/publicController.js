const renderHome = async (req, res) => {
  res.render("home");
};

const renderLogin = (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/profile");
  }
  return res.render("login");
};

const renderSignUp = (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/profile");
  }
  return res.render("signup");
};

module.exports = { renderHome, renderLogin, renderSignUp };
