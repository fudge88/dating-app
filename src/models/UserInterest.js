const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");

class UserInterest extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    references: {
      model: "user",
      key: "id",
    },
  },
  interest_id: {
    references: {
      model: "interest",
      key: "id",
    },
  },
};

const options = {
  sequelize: connection,
  modelName: "userInterest",
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

Interest.init(schema, options);

module.exports = UserInterest;
