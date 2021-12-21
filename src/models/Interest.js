const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");

class Interest extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  music: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  food: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spare_time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  movie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  games: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // matched_user: {
  //   references: {
  //     model: "user",
  //     key: "id",
  //   },
  // },
};

const options = {
  sequelize: connection,
  modelName: "interest",
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

Interest.init(schema, options);

module.exports = Interest;
