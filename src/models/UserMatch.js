const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");

class UserMatch extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "user",
      key: "id",
    },
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
  modelName: "userMatch",
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

UserMatch.init(schema, options);

module.exports = UserMatch;
