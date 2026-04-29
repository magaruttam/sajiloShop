import sequelize from "../config/db";
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

type CartStatus = "active" | "abandoned" | "converted";

class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare status: CartStatus;
}

Cart.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: "users",
      key: "id",
    },
  },
  status: {
    type: DataTypes.ENUM("active", "abandoned", "converted"),
    allowNull: false,
    defaultValue: "active",
  },
}, {
  sequelize,
  modelName: "Cart",
  tableName: "carts",
  timestamps: true,
  indexes: [
    { fields: ["userId"], unique: true },
    { fields: ["status"] }
  ],
});

export default Cart;
