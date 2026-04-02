import sequelize from "../config/db";
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from "sequelize";

export type UserRole = "admin" | "user" | "vendor";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare role: UserRole;
}

User.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    role: {
      type: DataTypes.ENUM(...["admin", "user", "vendor"] as const),
      allowNull: false,
      defaultValue: "user", 
    }
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
    tableName: "users",
    indexes: [
      { unique: true, fields: ["email"] }, // add unique here instead
    ],
  },
);

export default User;
