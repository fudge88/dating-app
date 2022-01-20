const { Op } = require("sequelize");
const { User, Match } = require("../../models");

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
        return { matchUser: match.toUser, matchId: match.id };
      } else {
        return { matchUser: match.fromUser, matchId: match.id };
      }
    }),
  });
};

const renderSearch = (req, res) => {
  const { name } = req.session.user;
  res.render("search", { name });
};

module.exports = { renderProfile, renderSearch };
