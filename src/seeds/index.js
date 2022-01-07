require("dotenv").config();

const seedMatches = require("./matchSeeds");
const seedUsers = require("./userSeeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUsers();
  console.log("\n----- USER SEEDED -----\n");

  await seedMatches();
  console.log("\n----- MATCH SEEDED -----\n");

  process.exit(0);
};

seedAll();
