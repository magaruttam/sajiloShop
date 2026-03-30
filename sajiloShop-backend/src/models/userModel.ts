import { defaultMaxListeners } from "node:events";
import sequelize from "../config/db";
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreateOptions,
} from "sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id?: CreateOptions<number>;
  declare userName: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
    tableName: "users",
    indexes: [
      { unique: true, fields: ["userName"] }, // add unique here instead
      { unique: true, fields: ["email"] }, // add unique here instead
    ],
  },
);

export default User;
