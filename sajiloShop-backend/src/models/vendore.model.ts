import { DataType } from "sequelize-typescript";
import sequelize from "../config/db";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional ,DataTypes} from 'sequelize';

type VendorStatus = "pending" | "approved" | "rejected";

class Vendor extends Model<InferAttributes<Vendor>, InferCreationAttributes<Vendor>> {  
 declare id: CreationOptional<number>;
 declare user_id: number;
 declare status: VendorStatus;
 declare commission_rate: number;
 declare balance: number;
}

Vendor.init({
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},
user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
},
status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    allowNull: false,
    defaultValue: "pending"
},
commission_rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
},
balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
}


},{
    sequelize,
    modelName: "Vendor",
    timestamps: true,
    tableName: "vendors",
})

export default Vendor;