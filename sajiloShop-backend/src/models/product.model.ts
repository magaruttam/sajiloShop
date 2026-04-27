import sequelize from "../config/db";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional ,DataTypes} from 'sequelize';

type ProductStatus = "pending" | "approved" | "rejected";

class Product extends Model<InferAttributes<Product>,InferCreationAttributes<Product>>{
    declare id: CreationOptional<number>;
    declare vendorId: number;
    declare categoryId: number;
    declare name: string;
    declare price: string;
    declare stock: number;
    declare status: ProductStatus;
    declare description: string;
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    vendorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "vendors",
            key: "id",
        },
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "categories",
            key: "id",
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(...["pending", "approved", "rejected"] as const),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
    indexes: [{ fields: ["name"] }, { fields: ["status"] }],
});

export default Product;