const Interest = require("./Interest");
const Match = require("./Match");
const User = require("./User");
const UserInterest = require("./UserInterest");
const UserMatch = require("./UserMatch");

// ASSOCIATIONS

User.belongsToMany(Match, {
  through: UserMatch,
  foreignKey: "user_id",
  // sourceKey: "id",
  // otherKey: "match_request_to",
  // foreignKeyConstraint: false,
  onDelete: "CASCADE",
});

Match.belongsToMany(User, {
  through: UserMatch,
  foreignKey: "user_id",
  // targetKey: "id",
  // otherKey: "match_request_to",
  // foreignKeyConstraint: false,
  // constraints: false,
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
