const UserInterest = require("../models/UserInterest");

const userInterestData = [
  {
    user_id: 1,
    interest_id: 3,
  },
  {
    user_id: 1,
    interest_id: 2,
  },
  {
    user_id: 5,
    interest_id: 3,
  },
  {
    user_id: 2,
    interest_id: 1,
  },
  {
    user_id: 4,
    interest_id: 3,
  },
];

const seedUserInterests = () => UserInterest.bulkCreate(userInterestData);

module.exports = seedUserInterests;
