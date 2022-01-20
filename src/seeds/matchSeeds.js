const Match = require("../models/Match");

const matchData = [
  {
    match_request_from: 1,
    match_request_to: 2,
    matched: true,
  },
];

const seedMatches = () => Match.bulkCreate(matchData);

module.exports = seedMatches;
