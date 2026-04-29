import sequelize from "../config/db";
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

class CartItem extends Model<InferAttributes<CartItem>, InferCreationAttributes<CartItem>> {
  declare id: CreationOptional<number>;
  declare cartId: number;
  declare productId: number;
  declare quantity: number;
  declare priceSnapshot: string;
}

CartItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "carts",
      key: "id",
    },
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
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
  priceSnapshot: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    get() {
      const value = this.getDataValue("priceSnapshot");
      return value ? Number(value) : 0;
    },
  },
}, {
  sequelize,
  modelName: "CartItem",
  tableName: "cart_items",
  timestamps: true,
  indexes: [
    { fields: ["cartId"] },
    { fields: ["productId"] },
    { fields: ["cartId", "productId"], unique: true },
  ],
});

export default CartItem;
