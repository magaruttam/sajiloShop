import { InferAttributes, InferCreationAttributes, Model, CreationOptional, DataTypes } from "sequelize";
import sequelize from "../config/db";

type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
type paymentStatus = "pending" | "paid" | "failed";
type paymentMethod = "cash" | "card" | "bank_transfer";

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    declare id: CreationOptional<number>;
    declare userId: number;
    declare totalAmount: string;
    declare orderStatus: OrderStatus;
    declare paymentStatus: paymentStatus;
    declare paymentMethod: paymentMethod;
    declare shippingAddress: string;
    declare phoneNumber: string;
}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    orderStatus: {
        type: DataTypes.ENUM(...["pending", "confirmed", "shipped", "delivered", "cancelled"] as const),
        allowNull: false,
    },
    paymentStatus: {
        type: DataTypes.ENUM(...["pending", "paid", "failed"] as const),
        allowNull: false,
    },
    paymentMethod: {
        type: DataTypes.ENUM(...["cash", "card", "bank_transfer"] as const),
        allowNull: false,
    },
    shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: true,
    indexes: [{ fields: ["userId"] }, { fields: ["orderStatus"] }],
}
)