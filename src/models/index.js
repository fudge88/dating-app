const Interest = require("./Interest");
const Match = require("./Match");
const User = require("./User");
const UserInterest = require("./UserInterest");
const UserMatch = require("./UserMatch");

// ASSOCIATIONS

Match.belongsTo(User, {
  foreignKey: "match_request_from",
});

Match.belongsTo(User, {
  foreignKey: "match_request_to",
});

User.hasMany(Match, {
  foreignKey: "match_request_from",
});

User.hasMany(Match, {
  foreignKey: "match_request_to",
});


module.exports = {
  Interest,
  Match,
  User,
  UserInterest,
  UserMatch,
};
