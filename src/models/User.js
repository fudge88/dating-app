const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");
const hashPassword = require("../hooks/hashPassword");

class User extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { isNumeric: true },
  },
  gender: {
    type: DataTypes.ENUM({
      values: ["male", "female", "other"],
    }),
    allowNull: false,
  },
  sexual_preference: {
    type: DataTypes.ENUM({
      values: ["straight", "bisexual", "gay"],
      allowNull: false,
    }),
  },
  about_me: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  height: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
    },
  },
  build: {
    type: DataTypes.ENUM({
      values: ["slim", "athletic", "medium", "curvy", "large"],
      allowNull: false,
    }),
  },
  seriousness: {
    type: DataTypes.ENUM({
      values: ["low", "medium", "high"],
      allowNull: false,
    }),
  },
};

const options = {
  sequelize: connection,
  modelName: "user",
  freezeTableName: true,
  timestamps: true,
  underscored: true,
  hooks: {
    beforeCreate: hashPassword,
  },
};

class User extends Model {
  checkPassword() {}
}

User.init(schema, options);

module.exports = User;
