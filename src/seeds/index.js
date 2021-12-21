const seedInterests = require("./InterestSeeds");
const seedMatches = require("./matchSeeds");
const seedUsers = require("./userSeeds");
const seedUserInterests = require("./userInterestSeeds");
const seedUserMatches = require("./userMatchSeeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedInterests();
  console.log("\n----- INTEREST SEEDED -----\n");

  await seedMatches();
  console.log("\n----- MATCH SEEDED -----\n");

  await seedUsers();
  console.log("\n----- USER SEEDED -----\n");

  await seedUserInterests();
  console.log("\n----- USER-INTEREST SEEDED -----\n");

  await seedUserMatches();
  console.log("\n----- USER-MATCH SEEDED -----\n");

  process.exit(0);
};

seedAll();
