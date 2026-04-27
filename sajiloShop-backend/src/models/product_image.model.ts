import sequelize from "../config/db";

import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

class ProductImage extends Model<InferAttributes<ProductImage>, InferCreationAttributes<ProductImage>> {
  declare id: CreationOptional<number>;
  declare productId: number;
  declare url: string;
}

ProductImage.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'productImage',
  timestamps: true,
  tableName: 'product_images'
})
 
export default ProductImage;
