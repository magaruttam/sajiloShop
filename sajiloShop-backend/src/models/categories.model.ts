import { InferAttributes, InferCreationAttributes, Model, CreationOptional, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>>{
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string;
}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Category",
    tableName: "categories",
    timestamps: true,
    indexes: [{ fields: ["name"] }],
})

export default Category;