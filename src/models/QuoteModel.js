import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./UsersModel.js";

const { DataTypes } = Sequelize;

const Quote = db.define(
  "quote",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(Quote);
Quote.belongsTo(User, { foreignKey: 'userId' });

export default Quote