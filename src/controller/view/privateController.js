const renderMatches = (req, res) => {
  res.render("matches");
};

const renderProfile = (req, res) => {
  res.render("profile");
};

// const renderMessage = (req, res) => {
//   res.render("message");
// };

const renderSearch = (req, res) => {
  res.render("search");
};

module.exports = { renderProfile, renderMatches, renderSearch };
