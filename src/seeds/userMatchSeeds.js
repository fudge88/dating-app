const UserMatch = require("../models/UserMatch");

const userMatchData = [
  {
    user_id: 1,
    match_id: 5,
  },
  {
    user_id: 1,
    match_id: 4,
  },
  {
    user_id: 5,
    match_id: 3,
  },
  {
    user_id: 2,
    match_id: 1,
  },
  {
    user_id: 4,
    match_id: 2,
  },
];

const seedUserMatches = () => UserMatch.bulkCreate(userMatchData);

module.exports = seedUserMatches;
