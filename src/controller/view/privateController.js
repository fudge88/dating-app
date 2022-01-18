const { User, Match } = require("../../models");

const renderMatches = (req, res) => {
  res.render("matches");
};

const renderProfile = async (req, res) => {
  const { id: loggedInUserId } = req.session.user;

  const userFromDb = await User.findByPk(loggedInUserId, {
    attributes: {
      exclude: ["password"],
    },
  });
  const user = userFromDb.get({ plain: true });

  const matchesFromDb = await Match.findAll({
    where: {
      matched: true,
      match_request_from: loggedInUserId,
    },
    include: [
      {
        model: User,
        foreignKey: "match_request_to",
        attributes: {
          exclude: ["password"],
        },
      },
    ],
  });
  const matches = matchesFromDb.map((match) => {
    return match.get({ plain: true });
  });
  console.log({
    user,
    matches: matches.map((match) => {
      return match.user;
    }),
  });
  res.render("profile", {
    user,
    matches: matches.map((match) => {
      return match.user;
    }),
  });
};

// const renderMessage = (req, res) => {
//   res.render("message");
// };

const renderSearch = (req, res) => {
  res.render("search");
};

module.exports = { renderProfile, renderMatches, renderSearch };
