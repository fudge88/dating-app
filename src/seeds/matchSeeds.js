const Match = require("../models/Match");

const matchData = [
  {
    match_request_from: 2,
    match_request_to: 1,
  },
  {
    match_request_from: 3,
    match_request_to: 1,
  },
  {
    match_request_from: 5,
    match_request_to: 1,
  },
  {
    match_request_from: 6,
    match_request_to: 1,
  },
  {
    match_request_from: 8,
    match_request_to: 1,
  },
  {
    match_request_from: 9,
    match_request_to: 1,
  },
];

const seedMatches = () => Match.bulkCreate(matchData);

module.exports = seedMatches;
