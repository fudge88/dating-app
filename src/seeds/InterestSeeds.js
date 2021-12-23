const Interest = require("../models/Interest");

const interestData = [
  {
    music_type: "classical",
    food_cuisine: "chinese",
    spare_time: "read",
    movie_genre: "action",
    activity_level: "very active",
  },
  {
    music_type: "rock",
    food_cuisine: "burgers",
    spare_time: "play guitar",
    movie_genre: "horror",
    activity_level: "not active",
  },
  {
    music_type: "rnb",
    food_cuisine: "burgers",
    spare_time: "gym",
    movie_genre: "comedy",
    activity_level: "active",
  },
  {
    music_type: "funky house",
    food_cuisine: "burgers",
    spare_time: "read",
    movie_genre: "comedy",
    activity_level: "active",
  },
  {
    music_type: "trap",
    food_cuisine: "chinese",
    spare_time: "read",
    movie_genre: "action",
    activity_level: "active",
  },
];

const seedInterests = () => Interest.bulkCreate(interestData);

module.exports = seedInterests;
