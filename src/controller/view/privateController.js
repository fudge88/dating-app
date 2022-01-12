const renderProfile = (req, res) => {
  res.render("profile");
};

const renderMatches = (req, res) => {
  res.render("matches");
};

const renderMessage = (req, res) => {
  res.render("message");
};

const renderSearch = (req, res) => {
  res.render("search");
};

module.exports = { renderProfile, renderMatches, renderMessage, renderSearch };
