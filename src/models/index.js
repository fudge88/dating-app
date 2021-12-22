const Interest = require("./Interest");
const Match = require("./Match");
const User = require("./User");
const UserInterest = require("./UserInterest");
const UserMatch = require("./UserMatch");

// ASSOCIATIONS

Match.belongsTo(User, {
  through: UserMatch,
  foreignKey: "match_id",
});

User.hasMany(Match, {
  through: UserMatch,
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Interest.belongsToMany(User, {
  through: UserInterest,
  foreignKey: "interest_id",
});

User.belongsToMany(Interest, {
  through: UserInterest,
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = {
  Interest,
  Match,
  User,
  UserInterest,
  UserMatch,
};
