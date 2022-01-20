const Match = require("./Match");
const User = require("./User");

// ASSOCIATIONS

Match.belongsTo(User, {
  foreignKey: "match_request_from",
  as: "fromUser",
});

Match.belongsTo(User, {
  foreignKey: "match_request_to",
  as: "toUser",
});

User.hasMany(Match, {
  foreignKey: "match_request_from",
});

User.hasMany(Match, {
  foreignKey: "match_request_to",
});

module.exports = {
  Match,
  User,
};
