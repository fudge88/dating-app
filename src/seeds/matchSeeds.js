const Match = require("../models/Match");

const matchData = [
  {
    match_request_from: 1,
    match_request_to: 3,
    match_request_status: "rejected",
  },
  {
    match_request_from: 1,
    match_request_to: 2,
    match_request_status: "pending",
  },
  {
    match_request_from: 5,
    match_request_to: 3,
    match_request_status: "accepted",
  },
  {
    match_request_from: 3,
    match_request_to: 5,
    match_request_status: "pending",
  },
  {
    match_request_from: 4,
    match_request_to: 2,
    match_request_status: "pending",
  },
];

const seedMatches = () => Match.bulkCreate(matchData);

module.exports = seedMatches;
