const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");

class Match extends Model {}

const schema = {};

const options = {
  sequelize: connection,
  modelName: "match",
  freezeTableName: true,
  timestamps: true,
  underscored: false,
};

Match.init(schema, options);

module.exports = Match;
