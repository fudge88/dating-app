const Sequelize = require("sequelize");

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

const dbOptions = {
  host: dbHost,
  user: dbUser,
  database: dbName,
  password: dbPassword,
  dialect: "mysql",
  port: 3306,
  logging: false,
};

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(dbName, dbUser, dbPassword, dbOptions);
}

module.exports = sequelize;
