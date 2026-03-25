import sequelize from "../config/db";  
import { DataTypes , Model ,InferAttributes , InferCreationAttributes } from 'sequelize';



class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare userName : string;
    declare email: string;
    declare password: string;
}

User.init(
  {
    // Model attributes are defined here
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
        },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
         isEmail: true,    
      }
    },
    
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
   
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  },
);
