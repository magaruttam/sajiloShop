import sequelize from "../config/db";

import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

class ProductImage extends Model<InferAttributes<ProductImage>, InferCreationAttributes<ProductImage>> {
  declare id: CreationOptional<number>;
  declare productId: number;
  declare url: string;
}
