import { InferAttributes, InferCreationAttributes, Model, CreationOptional, DataTypes } from "sequelize";
import sequelize from "../config/db";

class OrderItem extends Model<InferAttributes<OrderItem>, InferCreationAttributes<OrderItem>>{
    declare id: CreationOptional<number>;
    declare orderId: number;
    declare productId: number;
    declare quantity: number;
    declare price: string;
}

OrderItem.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "products",
            key: "id",
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "OrderItem",
    tableName: "order_items",
    timestamps: true,
    indexes: [{ fields: ["orderId"] }, { fields: ["productId"] }],
})

export default OrderItem;