const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");

class Interest extends Model {}

const schema = {};

const options = {
  sequelize: connection,
  modelName: "interest",
  freezeTableName: true,
  timestamps: true,
  underscored: false,
};

Interest.init(schema, options);

module.exports = Interest;
