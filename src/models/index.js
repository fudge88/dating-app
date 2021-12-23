const Interest = require("./Interest");
const Match = require("./Match");
const User = require("./User");
const UserInterest = require("./UserInterest");
const UserMatch = require("./UserMatch");

// ASSOCIATIONS

User.belongsTo(UserMatch, {
  foreignKey: "user_id",
});

Match.hasMany(UserMatch, {
  foreignKey: "match_id",
  onDelete: "CASCADE",
});

User.belongsToMany(UserInterest, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Interest.belongsToMany(UserInterest, {
  foreignKey: "interest_id",
  onDelete: "CASCADE",
});

module.exports = {
  Interest,
  Match,
  User,
  UserInterest,
  UserMatch,
};
