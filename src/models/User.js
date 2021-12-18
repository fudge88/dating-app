const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");

class User extends Model {}

const schema = {};

const options = {
  sequelize: connection,
  modelName: "user",
  freezeTableName: true,
  timestamps: true,
  underscored: false,
};

User.init(schema, options);

module.exports = User;
