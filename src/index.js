const Interest = require("./models/Interest");
const Match = require("./models/Match");
const User = require("./models/User");
const UserInterest = require("./models/UserInterest");
const UserMatch = require("./models/UserMatch");

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
