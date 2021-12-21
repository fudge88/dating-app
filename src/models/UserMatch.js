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
    references: {
      model: "user",
      key: "id",
    },
  },
  match_id: {
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

Interest.init(schema, options);

module.exports = UserMatch;
