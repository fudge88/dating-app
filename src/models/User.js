const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");

class User extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { isNumeric: true },
  },
  user_gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  match_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "match",
      key: "id",
    },
  },
};

const options = {
  sequelize: connection,
  modelName: "user",
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

User.init(schema, options);

module.exports = User;
