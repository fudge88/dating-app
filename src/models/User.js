const bcrypt = require("bcrypt");
const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");
const hashPassword = require("../hooks/hashPassword");

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
    allowNull: true,
  },
  sexual_preference: {
    type: DataTypes.ENUM({
      values: ["straight", "bisexual", "gay"],
      allowNull: true,
    }),
  },
  about_me: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  height: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: true,
    validate: {
      isDecimal: true,
    },
  },
  build: {
    type: DataTypes.ENUM({
      values: ["slim", "athletic", "medium", "curvy", "large"],
      allowNull: true,
    }),
  },
  seriousness: {
    type: DataTypes.ENUM({
      values: ["low", "medium", "high"],
      allowNull: true,
    }),
  },
};

const options = {
  sequelize: connection,
  modelName: "user",
  freezeTableName: true,
  timestamps: true,
  underscored: false,
  hooks: {
    beforeCreate: hashPassword,
  },
};

class User extends Model {
  async checkPassword(userPassword) {
    const isValid = await bcrypt.compare(userPassword, this.password);
    return isValid;
  }
}

User.init(schema, options);

module.exports = User;
