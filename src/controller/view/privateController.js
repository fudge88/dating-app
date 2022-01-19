const { Op } = require("sequelize");
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
      [Op.or]: [
        { match_request_to: loggedInUserId },
        { match_request_from: loggedInUserId },
      ],
    },
    include: [
      {
        model: User,
        foreignKey: "match_request_from",
        attributes: {
          exclude: ["password"],
        },
        as: "fromUser",
      },
      {
        model: User,
        foreignKey: "match_request_to",
        attributes: {
          exclude: ["password"],
        },
        as: "toUser",
      },
    ],
  });
  const matches = matchesFromDb.map((match) => {
    return match.get({ plain: true });
  });

  return res.render("profile", {
    user,
    matches: matches.map((match) => {
      if (match.fromUser.id === loggedInUserId) {
        return match.toUser;
      } else {
        return match.fromUser;
      }
    }),
  });
};

const renderSearch = (req, res) => {
  res.render("search");
};

module.exports = { renderProfile, renderMatches, renderSearch };
