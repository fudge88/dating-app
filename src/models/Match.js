const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");

class Match extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  match_request_from: {
    references: {
      model: "user",
      key: "id",
    },
  },
  match_request_to: {
    references: {
      model: "user",
      key: "id",
    },
  },
  match_request_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  accepted_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
};

const options = {
  sequelize: connection,
  modelName: "match",
  freezeTableName: true,
  timestamps: true,
  underscored: false,
};

Match.init(schema, options);

module.exports = Match;
