const renderProfile = (req, res) => {
  res.render("profile");
};
const renderMatches = (req, res) => {
  res.render("matches");
};
const renderMessage = (req, res) => {
  res.render("message");
};

module.exports = { renderProfile, renderMatches, renderMessage };
