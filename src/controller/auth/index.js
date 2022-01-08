const login = (req, res) => {
  res.render("login");
};

const signup = (req, res) => {};

const logout = (req, res) => {
  res.render("logout");
};

module.exports = { login, signup, logout };
